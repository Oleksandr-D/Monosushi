import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductComponent } from './admin-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import {ImageService} from "../../shared/services/image/image.service";

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProductComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: ImageService, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
