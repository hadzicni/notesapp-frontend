import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TagsService } from '../../services/tags.service';
import { TagDialogComponent } from './tag-dialog.component';

describe('TagDialogComponent', () => {
  let component: TagDialogComponent;
  let fixture: ComponentFixture<TagDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TagDialogComponent],
      providers: [
        TagsService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { tag: { id: 1, name: 'Test Tag' } },
        },
      ],
    });

    fixture = TestBed.createComponent(TagDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
