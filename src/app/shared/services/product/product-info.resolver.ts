import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import { IProductResponse } from '../../interfaces/products/products.interface';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductInfoResolver implements Resolve<IProductResponse> {
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };
  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {}
  //for json server with resolver
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  //  Observable < IProductResponse > {
  //   return this.productServise.getOne(Number(route.paramMap.get('id')));
  // }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | IProductResponse
    | Observable<IProductResponse>
    | Promise<IProductResponse> {
    const PRODUCT_ID = route.paramMap.get('id');
    return this.productService.getOneFirebase(PRODUCT_ID as string).pipe(
      map((data) => {
        console.log('from RESOLVER', data)
        return data as IProductResponse;
      })
    );
  }
}
