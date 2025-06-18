import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/aluno.model';

@Component({
  selector: 'app-aluno-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aluno-list.html',
  styleUrls: ['./aluno-list.css']
})
export class AlunoListComponent implements OnInit {
  alunos: Aluno[] = [];
  novoAluno: Aluno = { id: 0, nome: '', ativo: true };
  editandoAluno: Aluno | null = null;
  loading = false;

  constructor(private alunoService: AlunoService) { }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.loading = true;
    this.alunoService.getAlunos().subscribe({
      next: (alunos) => {
        this.alunos = alunos;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.loading = false;
      }
    });
  }

  adicionarAluno(): void {
    if (this.novoAluno.nome.trim()) {
      this.alunoService.createAluno(this.novoAluno).subscribe({
        next: () => {
          this.carregarAlunos();
          this.novoAluno = { id: 0, nome: '', ativo: true };
        },
        error: (error) => {
          console.error('Error adding student:', error);
        }
      });
    }
  }

  editarAluno(aluno: Aluno): void {
    this.editandoAluno = { ...aluno };
  }

  salvarEdicao(): void {
    if (this.editandoAluno) {
      this.alunoService.updateAluno(this.editandoAluno.id, this.editandoAluno).subscribe({
        next: () => {
          this.carregarAlunos();
          this.editandoAluno = null;
        },
        error: (error) => {
          console.error('Error updating student:', error);
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.editandoAluno = null;
  }

  excluirAluno(id: number): void {
    if (confirm('Are you sure you want to delete this student? This will also delete all their learning records.')) {
      this.alunoService.deleteAluno(id).subscribe({
        next: () => {
          this.carregarAlunos();
        },
        error: (error) => {
          console.error('Error deleting student:', error);
        }
      });
    }
  }
}

