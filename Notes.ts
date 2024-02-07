// Notes.ts

import { LoggedInUser } from "./Auth";

type Note = {
    id: number;
    userId?: number;
    note: string;
    created_at: string; // Consider using Date type for real applications
    updated_at: string; // Consider using Date type for real applications
  };
  
  class Notes {
    private notes: Note[] = [];
    constructor() {}
  
    create(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Note {
      const newNote: Note = {
        ...note,
        id: this.notes.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.notes.push(newNote);
      return newNote;
    }

    showAll(): Note[] {
      return this.notes;
    }

    show(id: number): Note | string {
      const note = this.notes.find(n => n.id === id);
      if (!note) {
        return 'Note not found.';
      }
      return note;
    }

    update(id: number, note: string): Note | string {
      const index = this.notes.findIndex(n => n.id === id);
      if (index === -1) {
        return 'Note not found.';
      }
      // if there is no userId everybody can edit otherwise only the owner can edit
      if (this.notes[index].userId && this.notes[index].userId !== LoggedInUser?.id) {
        return 'You are not authorized to edit this note.';
      }
      this.notes[index].note = note;
      this.notes[index].updated_at = new Date().toISOString();
      return this.notes[index];
    }

    delete(id: number): string {
      const index = this.notes.findIndex(n => n.id === id);
      if (index === -1) {
        return 'Note not found.';
      }
      // if there is no userId everybody can delete otherwise only the owner can delete
      if (this.notes[index].userId && this.notes[index].userId !== LoggedInUser?.id) {
        return 'You are not authorized to delete this note.';
      }
      this.notes.splice(index, 1);
      return 'Note deleted.';
    }
  }
  
  export default Notes;
  