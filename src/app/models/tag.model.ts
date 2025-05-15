// tag.model.ts
export interface Tag {
  id: number;
  name: string;
}

export interface CreateTag {
  name: string;
}

export interface UpdateTag {
  id: number;
  name?: string;
}
