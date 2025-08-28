import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicoService } from '../../services/topico.service';
import { Topico } from '../../models/topico.model';

@Component({
  selector: 'app-topico-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topico-list.html',
  styleUrls: ['./topico-list.css']
})
export class TopicoListComponent implements OnInit {
  topicos: Topico[] = [];
  novoTopico: Topico = { id: 0, nome: '' };
  editandoTopico: Topico | null = null;
  loading = false;

  constructor(private topicoService: TopicoService) { }

  ngOnInit(): void {
    this.carregarTopicos();
  }

  carregarTopicos(): void {
    this.loading = true;
    this.topicoService.getTopicos().subscribe({
      next: (topicos) => {
        this.topicos = topicos;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading topics:', error);
        this.loading = false;
      }
    });
  }

  adicionarTopico(): void {
    if (this.novoTopico.nome.trim()) {
      this.topicoService.createTopico(this.novoTopico).subscribe({
        next: () => {
          this.carregarTopicos();
          this.novoTopico = { id: 0, nome: '' };
        },
        error: (error) => {
          console.error('Error adding topic:', error);
          if (error.status === 409) {
            alert('This topic already exists.');
          }
        }
      });
    }
  }

  editarTopico(topico: Topico): void {
    this.editandoTopico = { ...topico };
  }

  salvarEdicao(): void {
    if (this.editandoTopico) {
      this.topicoService.updateTopico(this.editandoTopico.id, this.editandoTopico).subscribe({
        next: () => {
          this.carregarTopicos();
          this.editandoTopico = null;
        },
        error: (error) => {
          console.error('Error updating topic:', error);
          if (error.status === 409) {
            alert('This topic already exists.');
          }
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.editandoTopico = null;
  }

  excluirTopico(id: number): void {
    if (confirm('Are you sure you want to delete this topic? This will remove it from all learning records.')) {
      this.topicoService.deleteTopico(id).subscribe({
        next: () => {
          this.carregarTopicos();
        },
        error: (error) => {
          console.error('Error deleting topic:', error);
        }
      });
    }
  }
}

