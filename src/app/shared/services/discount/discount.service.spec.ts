import { TestBed } from '@angular/core/testing';

import { DiscountService } from './discount.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';

describe('DiscountService', () => {
  let service: DiscountService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ { provide: Storage, useValue: {} } ],
    });
    service = TestBed.inject(DiscountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    const data = [
      {
        id: 3,
        name:'string',
        title:'string',
        description: 'string',
        imagePath: 'string'
      },
    ];

    service.getAll().subscribe((response) => expect(response).toBe(data));

    const req = httpTestingController.expectOne('http://localhost:3000/discounts');

    expect(req.request.method).toBe('GET');

    req.flush(data);
  });
});
