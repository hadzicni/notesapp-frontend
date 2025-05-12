export interface Note {
  id: number;
  title: string;
  content: string;
  favorite: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNote {
  title: string;
  content: string;
  favorite: boolean;
  archived: boolean;
}

export interface UpdateNote {
  id: number;
  title?: string;
  content?: string;
  favorite?: boolean;
  archived?: boolean;
}

export interface NoteResponse {
  note: Note;
}
