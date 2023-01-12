import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AboutComponent } from './pages/about/about.component';
import { OffertaComponent } from './pages/offerta/offerta.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { DiscountInfoResolver } from './shared/services/discount/discount-info.resolver';
import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discount', component: DiscountComponent },
  {
    path: 'discount/:id',
    component: DiscountInfoComponent,
    resolve: { discountInfo: DiscountInfoResolver },
  },
  { path: 'product/:category', component: ProductComponent },
  {
    path: 'product/:category/:id',
    component: ProductInfoComponent,
    resolve: { productInfo: ProductInfoResolver },
  },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'offerta', component: OffertaComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/authorization/authorization.module').then(
        (m) => m.AuthorizationModule
      ),
  },
  {
    path: 'user-profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
