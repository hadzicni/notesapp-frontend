import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { CreateTag, Tag, UpdateTag } from '../models/tag.model';
import { TagsService } from './tags.service';

describe('TagsService', () => {
  let service: TagsService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/tags`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TagsService],
    });
    service = TestBed.inject(TagsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all tags', () => {
    const dummyTags: Tag[] = [
      { id: 1, name: 'Tag 1' },
      { id: 2, name: 'Tag 2' },
    ];

    service.getAll().subscribe((tags) => {
      expect(tags.length).toBe(2);
      expect(tags).toEqual(dummyTags);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTags);
  });

  it('should create a new tag', () => {
    const newTag: CreateTag = { name: 'New Tag' };
    const createdTag: Tag = { id: 1, name: 'New Tag' };

    service.create(newTag).subscribe((tag) => {
      expect(tag).toEqual(createdTag);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTag);
    req.flush(createdTag);
  });

  it('should update an existing tag', () => {
    const updatedTag: UpdateTag = { id: 1, name: 'Updated Tag' };
    const responseTag: Tag = { id: 1, name: 'Updated Tag' };

    service.update(updatedTag).subscribe((tag) => {
      expect(tag).toEqual(responseTag);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedTag);
    req.flush(responseTag);
  });

  it('should delete a tag', () => {
    const tagId = 1;

    service.delete(tagId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
