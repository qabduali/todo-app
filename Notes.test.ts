// Notes.test.ts

import Notes, { Note } from './Notes';

describe('Notes', () => {
  let notes: Notes;

  beforeEach(() => {
    notes = new Notes();
  });

  test('Creating a new note should add it to the notes list', () => {
    const newNote = notes.create({ note: 'Test note' });
    expect(newNote).toMatchObject({
      id: 1,
      note: 'Test note',
    });
  });

  test('Showing all notes should return an array of notes', () => {
    notes.create({ note: 'Test note 1' });
    notes.create({ note: 'Test note 2' });
    const allNotes = notes.showAll();
    expect(allNotes).toHaveLength(2);
  });

  test('Showing a specific note should return the correct note', () => {
    const newNote = notes.create({ note: 'Test note' });
    const retrievedNote = notes.show(newNote.id);
    expect(retrievedNote).toEqual(newNote);
  });

  test('Updating a note should modify the note content and update the timestamp', () => {
    const newNote = notes.create({ note: 'Test note' });
    const newNoteUpdatedAt = +new Date(newNote.updated_at);
    const updatedNote = notes.update(newNote.id, 'Updated test note') as Note;
    expect(updatedNote).toMatchObject({
      id: newNote.id,
      note: 'Updated test note',
    });
    const updatedNoteUpdatedAt = +new Date(updatedNote.updated_at);

    expect(updatedNoteUpdatedAt).not.toEqual(newNoteUpdatedAt);
  });



  test('Deleting a note should remove it from the notes list', () => {
    const newNote = notes.create({ note: 'Test note' });
    const result = notes.delete(newNote.id);
    expect(result).toBe('Note deleted.');
    expect(notes.showAll()).toHaveLength(0);
  });

  test('Trying to show a non-existing note should return an error message', () => {
    const result = notes.show(999);
    expect(result).toBe('Note not found.');
  });

  test('Trying to update a non-existing note should return an error message', () => {
    const result = notes.update(999, 'Updated test note');
    expect(result).toBe('Note not found.');
  });

  test('Trying to delete a non-existing note should return an error message', () => {
    const result = notes.delete(999);
    expect(result).toBe('Note not found.');
  });

  test('Trying to update a note without permission should return an error message', () => {
    const newNote = notes.create({ note: 'Test note', userId: 2 });
    const result = notes.update(newNote.id, 'Updated test note');
    expect(result).toBe('You are not authorized to edit this note.');
  });

  test('Trying to delete a note without permission should return an error message', () => {
    const newNote = notes.create({ note: 'Test note', userId: 2 });
    const result = notes.delete(newNote.id);
    expect(result).toBe('You are not authorized to delete this note.');
  });
});
