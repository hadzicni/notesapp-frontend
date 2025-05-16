import { Notebook } from './notebook.model';
import { Tag } from './tag.model';

export interface Note {
  id: number;
  title: string;
  content: string;
  favorite: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  notebook?: Notebook | null;
  tags?: Tag[];
}

export interface CreateNote {
  title: string;
  content: string;
  favorite: boolean;
  archived: boolean;
  notebook?: { id: number };
  tags?: { id: number }[];
}

export interface UpdateNote {
  id: number;
  title?: string;
  content?: string;
  favorite?: boolean;
  archived?: boolean;
  notebook?: { id: number } | null;
  tags?: { id: number }[];
}

export interface NoteResponse {
  note: Note;
}
