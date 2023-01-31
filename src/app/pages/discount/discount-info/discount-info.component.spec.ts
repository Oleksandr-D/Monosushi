import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountInfoComponent } from './discount-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DiscountService } from '../../../shared/services/discount/discount.service';

xdescribe('DiscountInfoComponent', () => {
  let component: DiscountInfoComponent;
  let fixture: ComponentFixture<DiscountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountInfoComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: DiscountService, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const FAKE_DISCOUNT = [
      {
        id: 2,
        name: 'string',
        title: 'string',
        description: 'string',
        imagePath: 'string',
      },
    ];
     // component.discount = FAKE_DISCOUNT;
    expect(component).toBeTruthy();
  });
});
