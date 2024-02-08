// Notes.test.ts

import Notes, { Note } from './Notes';

describe('Notes', () => {
  let notes: Notes;

  beforeEach(() => {
    notes = new Notes();
  });

  test.each([
    ['Test note 1'],
    ['Test note 2'],
    ['Test note 3'],
  ])('Creating a new note with content %s should add it to the notes list', (noteContent) => {
    const newNote = notes.create({ note: noteContent });
    expect(newNote).toMatchObject({
      id: 1,
      note: noteContent,
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

    const newNote = notes.create({ note: 'Test note'});
    // Create newNote with old created_at and updated_at, assert that the updated_at is different after updating the note
    newNote.created_at = +(new Date('2024-01-08T12:00:00Z'))
    newNote.updated_at = +(new Date('2024-01-08T12:00:00Z'))
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
