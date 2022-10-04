import {
  Component,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute
} from '@angular/router';
import {
  ROLE
} from 'src/app/shared/constants/role.constants';
import {
  IProductResponse
} from 'src/app/shared/interfaces/products/products.interface';
import {
  AccountService
} from 'src/app/shared/services/account/account.service';
import {
  OrderService
} from 'src/app/shared/services/order/order.service';
import {
  ProductService
} from 'src/app/shared/services/product/product.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public basket: Array < IProductResponse > = [];
  public total = 0;
  public count = 0;
  public isOpen = false;
  public isShow = false;
  public isLogin = true;
  public loginUrl = '';
  public loginPage = '';

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    public dialog: MatDialog
    // private activatedRoute: ActivatedRoute,
    // private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesUserLogin()
  }

  togle() {
    this.isShow = !this.isShow;
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
    })
  }

  openModal(): void {
    this.isOpen = !this.isOpen;
  }

  closeModal(value: boolean): void {
    if (value) {
      this.isOpen = false;
    } else {
      this.isOpen = !this.isOpen;
    }
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    this.getTotalPrice();
  }

  //by form add products? 

  //check if there is something in the basket add to local storage
  addToBasket(product: IProductResponse): void {
    let basket: Array < IProductResponse >= [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
    this.openModal();
  }

  //show user ROLE in header
  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';

    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'user-profile';
      this.loginPage = 'User';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  //check login ROLE changes 
  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

  openLoginDialog(){
     this.dialog.open(AuthDialogComponent,{
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
     }).afterClosed().subscribe( result => {
      console.log(result);
      
     })
  }

}