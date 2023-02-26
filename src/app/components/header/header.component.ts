import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ROLE } from 'src/app/shared/constants/role.constants';
import { IProductResponse } from 'src/app/shared/interfaces/products/products.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { CallBackDialogComponent } from '../call-back-dialog/call-back-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public basket: Array<IProductResponse> = [];
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
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog // private activatedRoute: ActivatedRoute, // private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
  }

  orderScroll() {
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
    this.count = this.basket.reduce(
      (total: number, prod: IProductResponse) => total + prod.count,
      0
    );
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  openModal(): void {
    this.isOpen = !this.isOpen;
    this.orderService.changeBasket.next(true);
  }

  closeModal(value: boolean): void {
    if (value) {
      this.isOpen = false;
    } else {
      this.isOpen = !this.isOpen;
    }
  }

  //check if there is something in the basket add to local storage count
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

  //delete products from basket
  deleteFromBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    const index = basket.findIndex((prod) => prod.id === product.id);
    this.basket.splice(index, 1);
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  //show user ROLE in header
  checkUserLogin(): void {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      const user = JSON.parse(localStorage.getItem('currentUser') as string);
      this.isLogin = true;
      this.loginUrl = 'user-profile';
      if (user.firstName === '') {
        this.loginPage = 'User';
      }
      if (user.firstName) {
        this.loginPage = user.firstName;
      }
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
    });
  }

  //modal window with user login or registration. Opening auth dialog component
  openLoginDialog(): void {
    this.dialog
      .open(AuthDialogComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'auth-dialog',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((result) => {
      });
  }

  //modal window "we'll call you"
  openCallBackDialog() {
    this.dialog
      .open(CallBackDialogComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'auth-dialog',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((result) => {});
  }
}
