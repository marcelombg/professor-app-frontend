import { Routes } from '@angular/router';
import { AlunoListComponent } from './components/aluno-list/aluno-list';
import { TopicoListComponent } from './components/topico-list/topico-list';
import { AprendizadoManagerComponent } from './components/aprendizado-manager/aprendizado-manager';

export const routes: Routes = [
  { path: '', redirectTo: '/aprendizados', pathMatch: 'full' },
  { path: 'alunos', component: AlunoListComponent },
  { path: 'topicos', component: TopicoListComponent },
  { path: 'aprendizados', component: AprendizadoManagerComponent }
];

