import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/products/products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public basket: Array < IProductResponse > = [];
  public total = 0;
  public count = 0;
  public orderForm!:FormGroup;

  constructor(
    private orderService: OrderService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initOrderForm();
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      cutlery: [null, Validators.required],
      holders: [null, Validators.required],
      payment_method: [null, Validators.required],
      delivery_method: [null, Validators.required],



    })
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductResponse) =>
      total + prod.count * prod.price, 0);
    this.count = this.basket.reduce((total: number, prod: IProductResponse) =>
      total + prod.count, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  productCount(product: IProductResponse, value: boolean): void {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    if (basket.some((prod) => prod.id === product.id)) {
      const index = basket.findIndex((prod) => prod.id === product.id);
      if (value) {
        ++product.count;
        basket[index].count += 1;
      } else if (!value && product.count > 1) {
        --product.count;
        basket[index].count -= 1;
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.getTotalPrice();
    this.orderService.changeBasket.next(true);
  }


  //delete products from order
  deleteFromOrder(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    const index = basket.findIndex((prod) => prod.id === product.id);
    this.basket.splice(index, 1);
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  toOrder(){
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    console.log('BASKET==>',basket )
  }
  //create orders on firebase and get it to admin orders





}
