import {
  Component,
  OnInit
} from '@angular/core';
import {
  IProductResponse
} from 'src/app/shared/interfaces/products/products.interface';
import {
  ProductService
} from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public userProducts: Array < IProductResponse >= [];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.userProducts = data;
    })
  }


}