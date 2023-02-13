import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Firestore, useValue: {} }],
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    const data = [
      {
        id: 2,
        name: 'string',
        path: 'string',
        imagePath: 'string',
      },
    ];

    service.getAll().subscribe((response) => expect(response).toBe(data));

    const req = httpTestingController.expectOne(
      'http://localhost:3000/categories'
    );

    expect(req.request.method).toBe('GET');

    req.flush(data);
  });

  afterEach(() => httpTestingController.verify());
});
