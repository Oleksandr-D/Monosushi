import { TestBed } from '@angular/core/testing';

import { ProductInfoResolver } from './product-info.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';

describe('ProductInfoResolver', () => {
  let resolver: ProductInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Firestore, useValue: {} }],
    });
    resolver = TestBed.inject(ProductInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
