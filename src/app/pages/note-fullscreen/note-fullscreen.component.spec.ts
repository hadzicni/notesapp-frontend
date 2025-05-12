import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFullscreenComponent } from './note-fullscreen.component';

describe('NoteFullscreenComponent', () => {
  let component: NoteFullscreenComponent;
  let fixture: ComponentFixture<NoteFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteFullscreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
