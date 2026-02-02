export type NoteTag = 'Work' | 'Personal' | 'Home' | 'Important' | 'Todo';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string; // Додано
  updatedAt: string; // Додано
}