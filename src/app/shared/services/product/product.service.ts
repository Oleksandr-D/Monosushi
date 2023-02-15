import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IProductRequest,
  IProductResponse,
} from '../../interfaces/products/products.interface';
import {
  addDoc, collectionData,
  CollectionReference, deleteDoc, doc, docData,
  Firestore, updateDoc,
} from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };
  private categoryCollection!: CollectionReference<DocumentData>;

  constructor(private http: HttpClient, private afs: Firestore) {
    this.categoryCollection = collection(this.afs, 'products');
  }

  //for json server
  // getAll(): Observable<IProductResponse[]> {
  //   return this.http.get<IProductResponse[]>(this.api.products);
  // }
  //
  getOne(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`);
  }
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

  getAllByCategory(name: string): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(
      `${this.api.products}?category.path=${name}`
    );
  }
  //------------------------------------------------------------------------------------
  //for firebase
  getAllFirebase(){
    return collectionData(this.categoryCollection, {idField:'id'})
  }
  createFirebase(product: IProductRequest) {
    return addDoc(this.categoryCollection, product);
  }
  updateFirebase(product: IProductRequest, id: string) {
    const categoryDocumentReferense = doc(this.afs, `products/${id}`);
    return updateDoc(categoryDocumentReferense, { ...product });
  }
  deleteFirebase(id: string) {
    const categoryDocumentReferense = doc(this.afs, `products/${id}`);
    return deleteDoc(categoryDocumentReferense);
  }

  getOneFirebase(id: string) {
    const categoryDocumentReferense = doc(this.afs, `products/${id}`);
    return docData(categoryDocumentReferense, {idField:'id'});
  }


}
