import { Topico } from './topico.model';

export interface Aprendizado {
  id: number;
  alunoId: number;
  alunoNome: string;
  dataRegistro: Date;
  descricao: string;
  topicos: Topico[];
}

export interface AprendizadoDto {
  alunoId: number;
  descricao: string;
  topicoIds?: number[];
}

