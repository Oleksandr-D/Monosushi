import {
  Component,
  OnInit
} from '@angular/core';
import {
  IProductResponse
} from 'src/app/shared/interfaces/products/products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private basket: Array < IProductResponse > = [];
  public total = 0;
  public count =0;

  constructor(
    private orderService:OrderService
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice():void{
   this.total = this.basket.reduce((total:number, prod:IProductResponse)=>
   total + prod.count * prod.price, 0);
   this.count = this.basket.reduce((total:number, prod:IProductResponse)=>
   total + prod.count, 0);
  }

  updateBasket():void{
  this.orderService.changeBasket.subscribe(()=>{
    this.loadBasket();
  })

  }

}