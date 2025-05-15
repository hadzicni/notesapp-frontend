// attachment.model.ts
export interface Attachment {
  id: number;
  fileName: string;
  fileType?: string;
  data?: string;
  noteId?: number;
}

export interface CreateAttachment {
  fileName: string;
  fileType?: string;
  data?: string;
  noteId?: number;
}

export interface UpdateAttachment {
  id: number;
  fileName?: string;
  fileType?: string;
  data?: string;
}
