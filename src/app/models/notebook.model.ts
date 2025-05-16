export interface Notebook {
  id: number;
  name: string;
  description?: string;
  userId?: string;
}

export interface CreateNotebook {
  name: string;
  description?: string;
}

export interface UpdateNotebook {
  id: number;
  name?: string;
  description?: string;
}
