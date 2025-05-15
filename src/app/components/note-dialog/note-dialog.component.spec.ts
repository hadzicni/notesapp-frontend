import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { NoteDialogComponent } from './note-dialog.component';

describe('NoteDialogComponent', () => {
  let component: NoteDialogComponent;
  let fixture: ComponentFixture<NoteDialogComponent>;
  let notesServiceSpy: Spy<NotesService>;
  let dialogRefMock: MatDialogRef<NoteDialogComponent>;

  const testNote: Note = {
    id: 1,
    title: 'Test Title',
    content: 'Test Content',
    archived: false,
    favorite: false,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    userId: 'user123',
  };

  beforeEach(async () => {
    notesServiceSpy = createSpyFromClass(NotesService);
    dialogRefMock = { close: jasmine.createSpy('close') } as any;

    await TestBed.configureTestingModule({
      imports: [
        NoteDialogComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: NotesService, useValue: notesServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call notesService.createNote and close the dialog when save is called with valid form', (done: DoneFn) => {
    notesServiceSpy.createNote.and.nextWith(testNote);

    component.form.controls['title'].setValue('Test Title');
    component.form.controls['content'].setValue('Test Content');

    component.save();

    expect(notesServiceSpy.createNote).toHaveBeenCalledWith({
      title: 'Test Title',
      content: 'Test Content',
      favorite: false,
      archived: false,
    });
    expect(dialogRefMock.close).toHaveBeenCalledWith(testNote);
    done();
  });

  it('should not call notesService.createNote when the form is invalid', () => {
    component.form.controls['title'].setValue('');
    component.form.controls['content'].setValue('');

    component.save();

    expect(notesServiceSpy.createNote).not.toHaveBeenCalled();
  });

  it('should close the dialog when close is called', () => {
    component.close();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
