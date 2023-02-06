import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    const data = [
      {
        id: 2,
        category: {
          id: 34,
          name: 'name category',
          path: 'string',
          imagePath: 'string',
        },
        name: 'string',
        path: 'string',
        description: 'string',
        weight: 'string',
        price: 150,
        imagePath: 'string',
        count: 10,
      },
    ];

    service.getAll().subscribe((response) => expect(response).toBe(data));

    const req = httpTestingController.expectOne('http://localhost:3000/products');

    expect(req.request.method).toBe('GET');

    req.flush(data);
  });

  afterEach(() => httpTestingController.verify());
});
