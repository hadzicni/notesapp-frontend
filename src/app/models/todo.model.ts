export interface Todo {
  id: number;
  title: string;
  done: boolean;
  dueDate: string;
  note: {
    id: number;
  };
}

export interface CreateTodo {
  title: string;
  done: boolean;
  dueDate: string;
  noteId: number;
}

export interface UpdateTodo {
  title?: string;
  done?: boolean;
  dueDate?: string;
  noteId?: number;
}
