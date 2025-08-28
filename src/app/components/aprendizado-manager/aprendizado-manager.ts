import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AprendizadoService } from '../../services/aprendizado.service';
import { AlunoService } from '../../services/aluno.service';
import { TopicoService } from '../../services/topico.service';
import { Aprendizado, AprendizadoDto } from '../../models/aprendizado.model';
import { Aluno } from '../../models/aluno.model';
import { Topico } from '../../models/topico.model';

@Component({
  selector: 'app-aprendizado-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aprendizado-manager.html',
  styleUrls: ['./aprendizado-manager.css']
})
export class AprendizadoManagerComponent implements OnInit {
  aprendizados: Aprendizado[] = [];
  alunos: Aluno[] = [];
  topicos: Topico[] = [];
  
  // Filtros
  filtroAlunoId: number | null = null;
  filtroTopicoId: number | null = null;
  
  // Formulário
  novoAprendizado: AprendizadoDto = {
    alunoId: 0,
    descricao: '',
    topicoIds: []
  };
  
  editandoAprendizado: { id: number; dados: AprendizadoDto } | null = null;
  loading = false;
  topicosSelecionados: { [key: number]: boolean } = {};

  constructor(
    private aprendizadoService: AprendizadoService,
    private alunoService: AlunoService,
    private topicoService: TopicoService
  ) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregarAlunos();
    this.carregarTopicos();
    this.carregarAprendizados();
  }

  carregarAlunos(): void {
    this.alunoService.getAlunos().subscribe({
      next: (alunos) => {
        this.alunos = alunos;
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  carregarTopicos(): void {
    this.topicoService.getTopicos().subscribe({
      next: (topicos) => {
        this.topicos = topicos;
      },
      error: (error) => {
        console.error('Error loading topics:', error);
      }
    });
  }

  carregarAprendizados(): void {
    this.loading = true;
    this.aprendizadoService.getAprendizados(
      this.filtroAlunoId || undefined,
      this.filtroTopicoId || undefined
    ).subscribe({
      next: (aprendizados) => {
        this.aprendizados = aprendizados;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading learning record:', error);
        this.loading = false;
      }
    });
  }

  aplicarFiltros(): void {
    this.carregarAprendizados();
  }

  limparFiltros(): void {
    this.filtroAlunoId = null;
    this.filtroTopicoId = null;
    this.carregarAprendizados();
  }

  adicionarAprendizado(): void {
    if (this.novoAprendizado.alunoId && this.novoAprendizado.descricao.trim()) {
      this.novoAprendizado.topicoIds = this.getTopicosSelecionados();
      
      this.aprendizadoService.createAprendizado(this.novoAprendizado).subscribe({
        next: () => {
          this.carregarAprendizados();
          this.resetarFormulario();
        },
        error: (error) => {
          console.error('Error registering learning record:', error);
        }
      });
    }
  }

  editarAprendizado(aprendizado: Aprendizado): void {
    this.editandoAprendizado = {
      id: aprendizado.id,
      dados: {
        alunoId: aprendizado.alunoId,
        descricao: aprendizado.descricao,
        topicoIds: aprendizado.topicos.map(t => t.id)
      }
    };
    
    // Configurar tópicos selecionados para edição
    this.topicosSelecionados = {};
    aprendizado.topicos.forEach(topico => {
      this.topicosSelecionados[topico.id] = true;
    });
  }

  salvarEdicao(): void {
    if (this.editandoAprendizado) {
      this.editandoAprendizado.dados.topicoIds = this.getTopicosSelecionados();
      
      this.aprendizadoService.updateAprendizado(
        this.editandoAprendizado.id,
        this.editandoAprendizado.dados
      ).subscribe({
        next: () => {
          this.carregarAprendizados();
          this.cancelarEdicao();
        },
        error: (error) => {
          console.error('Error updating learning record:', error);
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.editandoAprendizado = null;
    this.topicosSelecionados = {};
  }

  excluirAprendizado(id: number): void {
    if (confirm('Are you sure you want to delete this learning record?')) {
      this.aprendizadoService.deleteAprendizado(id).subscribe({
        next: () => {
          this.carregarAprendizados();
        },
        error: (error) => {
          console.error('Error deleting learning record:', error);
        }
      });
    }
  }

  exportarExcel(): void {
    this.aprendizadoService.exportarExcel(
      this.filtroAlunoId || undefined,
      this.filtroTopicoId || undefined
    ).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'learningRecord.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error exporting Excel:', error);
      }
    });
  }

  private getTopicosSelecionados(): number[] {
    return Object.keys(this.topicosSelecionados)
      .filter(key => this.topicosSelecionados[+key])
      .map(key => +key);
  }

  private resetarFormulario(): void {
    this.novoAprendizado = {
      alunoId: 0,
      descricao: '',
      topicoIds: []
    };
    this.topicosSelecionados = {};
  }

  toggleTopico(topicoId: number): void {
    this.topicosSelecionados[topicoId] = !this.topicosSelecionados[topicoId];
  }

  getNomeAluno(alunoId: number): string {
    const aluno = this.alunos.find(a => a.id === alunoId);
    return aluno ? aluno.nome : 'Student not found';
  }
}