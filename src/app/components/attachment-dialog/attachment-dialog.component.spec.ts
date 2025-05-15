import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentDialogComponent } from './attachment-dialog.component';

describe('AttachmentDialogComponent', () => {
  let component: AttachmentDialogComponent;
  let fixture: ComponentFixture<AttachmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
