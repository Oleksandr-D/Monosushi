import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {IProductRequest, IProductResponse} from '../../interfaces/products/products.interface';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc,
         docData, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root',
})
export class ProductService{
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products`};
  private productCollection!: CollectionReference<DocumentData>;

  constructor(private http: HttpClient, private afs: Firestore) {
    this.productCollection = collection(this.afs, 'products');
  }

  //use resolve at service
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):IProductResponse | Observable<IProductResponse> | Promise<IProductResponse>  {
  //   const PRODUCT_ID = route.paramMap.get('id');
  //   return this.getOneFirebase(PRODUCT_ID as string).pipe(
  //     map((data) => {
  //       console.log('data', data)
  //       return data as IProductResponse;
  //     })
  //   )
  // }

  //for json server
  // getAll(): Observable<IProductResponse[]> {
  //   return this.http.get<IProductResponse[]>(this.api.products);
  // }
  //
  // getOne(id: number): Observable<IProductResponse> {
  //   return this.http.get<IProductResponse>(`${this.api.products}/${id}`);
  // }
  //
  // create(product: IProductRequest): Observable<IProductResponse> {
  //   return this.http.post<IProductResponse>(this.api.products, product);
  // }
  //
  // update(product: IProductRequest, id: number): Observable<IProductResponse> {
  //   return this.http.patch<IProductResponse>(
  //     `${this.api.products}/${id}`, product);
  // }
  //
  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.products}/${id}`);
  // }

  // getAllByCategory(name: string): Observable<IProductResponse[]> {
  //   return this.http.get<IProductResponse[]>(
  //     `${this.api.products}?category.path=${name}`
  //   );
  // }
  //------------------------------------------------------------------------------------
  //for firebase
  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' });
  }
  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }
  updateFirebase(product: IProductRequest, id: string) {
    const productDocumentReferense = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReferense, { ...product });
  }
  deleteFirebase(id: string) {
    const productDocumentReferense = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReferense);
  }

  getOneFirebase(id: string) {
    const productDocumentReferense = doc(this.afs, `products/${id}`);
    return docData(productDocumentReferense, { idField: 'id' });
  }

  async getAllByCategoryFirebase(name: string) {
    const arr: DocumentData[] = [];
    const category = query(
      collection(this.afs, 'products'), where('category.path', '==', `${name}`));
    const querySnapshot = await getDocs(category);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return arr;
  }


}
