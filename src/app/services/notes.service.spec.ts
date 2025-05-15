import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { CreateNote, Note, UpdateNote } from '../models/note.model';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;
  let httpSpy: Spy<HttpClient>;

  const testNote: Note = {
    id: 1,
    title: 'Test Note',
    content: 'Test Content',
    archived: false,
    favorite: false,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    userId: 'user123',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
        NotesService,
        { provide: MatDialogRef, useValue: {} },
      ],
      teardown: { destroyAfterEach: true },
    });

    service = TestBed.inject(NotesService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch notes', (done: DoneFn) => {
    httpSpy.get.and.nextWith([testNote]);

    service.getNotes().subscribe({
      next: (notes) => {
        expect(notes).toEqual([testNote]);
        done();
      },
      error: done.fail,
    });

    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should get a note by id', (done: DoneFn) => {
    httpSpy.get.and.nextWith(testNote);

    service.getNoteById(1).subscribe({
      next: (note) => {
        expect(note).toEqual(testNote);
        done();
      },
      error: done.fail,
    });

    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should get archived notes', (done: DoneFn) => {
    httpSpy.get.and.nextWith([testNote]);

    service.getArchivedNotes().subscribe({
      next: (notes) => {
        expect(notes).toEqual([testNote]);
        done();
      },
      error: done.fail,
    });

    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should get favourite notes', (done: DoneFn) => {
    httpSpy.get.and.nextWith([testNote]);

    service.getFavourizedNotes().subscribe({
      next: (notes) => {
        expect(notes).toEqual([testNote]);
        done();
      },
      error: done.fail,
    });

    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should create a new note', (done: DoneFn) => {
    const newNote: CreateNote = {
      title: 'New',
      content: '...',
      archived: false,
      favorite: false,
    };

    httpSpy.post.and.nextWith(testNote);

    service.createNote(newNote).subscribe({
      next: (note) => {
        expect(note).toEqual(testNote);
        done();
      },
      error: done.fail,
    });

    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update a note', (done: DoneFn) => {
    const update: UpdateNote = {
      id: 1,
      title: 'Updated',
      content: '...',
      archived: false,
      favorite: false,
    };

    httpSpy.patch.and.nextWith({ ...testNote, ...update });

    service.updateNote(update).subscribe({
      next: (note) => {
        expect(note.title).toBe('Updated');
        done();
      },
      error: done.fail,
    });

    expect(httpSpy.patch.calls.count()).toBe(1);
  });

  it('should delete a note', (done: DoneFn) => {
    httpSpy.delete.and.nextWith(undefined);

    service.deleteNote(1).subscribe({
      next: (result) => {
        expect(result).toBeUndefined();
        done();
      },
      error: done.fail,
    });

    expect(httpSpy.delete.calls.count()).toBe(1);
  });

  it('should mark note as favorite', (done: DoneFn) => {
    const favoriteNote = { ...testNote, favorite: true };
    httpSpy.patch.and.nextWith(favoriteNote);

    service.markAsFavorite(testNote, true).subscribe({
      next: (note) => {
        expect(note.favorite).toBeTrue();
        done();
      },
      error: done.fail,
    });

    expect(httpSpy.patch.calls.count()).toBe(1);
  });

  it('should archive a note', (done: DoneFn) => {
    const archivedNote = { ...testNote, archived: true };
    httpSpy.patch.and.nextWith(archivedNote);

    service.archiveNote(testNote, true).subscribe({
      next: (note) => {
        expect(note.archived).toBeTrue();
        done();
      },
      error: done.fail,
    });

    expect(httpSpy.patch.calls.count()).toBe(1);
  });

  it('should set notes', () => {
    const newNotes: Note[] = [
      {
        id: 2,
        title: 'New Note',
        content: 'Content',
        archived: false,
        favorite: false,
        createdAt: '2025-02-01',
        updatedAt: '2025-02-01',
        userId: 'user123',
      },
    ];

    service.setNotes(newNotes);

    service.notes$.subscribe((notes) => {
      expect(notes).toEqual(newNotes);
    });
  });

  it('should add a new note', () => {
    const newNote: Note = {
      id: 3,
      title: 'Added Note',
      content: 'Content',
      archived: false,
      favorite: false,
      createdAt: '2025-03-01',
      updatedAt: '2025-03-01',
      userId: 'user123',
    };

    service.addNote(newNote);

    service.notes$.subscribe((notes) => {
      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(newNote);
    });
  });
});
