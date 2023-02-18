import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IDiscountRequest,
  IDiscountResponse,
} from '../../interfaces/discount/discount.interface';
import {
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  private url = environment.BACKEND_URL;
  private api = { discounts: `${this.url}/discounts` };
  private categoryCollection!: CollectionReference<DocumentData>;

  constructor(private http: HttpClient, private afs: Firestore) {
    this.categoryCollection = collection(this.afs, 'discounts');
  }
  //for json server
  // getAll(): Observable<IDiscountResponse[]> {
  //   return this.http.get<IDiscountResponse[]>(this.api.discounts);
  // }

  // getOne(id: number): Observable<IDiscountResponse> {
  //   return this.http.get<IDiscountResponse>(`${this.api.discounts}/${id}`);
  // }

  // create(discount: IDiscountRequest): Observable<IDiscountResponse> {
  //   return this.http.post<IDiscountResponse>(this.api.discounts, discount);
  // }

  // update(discount: IDiscountRequest, id: number): Observable<IDiscountResponse> {
  //   return this.http.patch<IDiscountResponse>(`${this.api.discounts}/${id}`, discount);
  // }
  //
  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.discounts}/${id}`);
  // }
  //-------------------------------------------------------------------------------------------
  //for firebase
  getAllFirebase() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }
  createFirebase(discount: IDiscountRequest) {
    return addDoc(this.categoryCollection, discount);
  }
  updateFirebase(discount: IDiscountRequest, id: string) {
    const categoryDocumentReferense = doc(this.afs, `discounts/${id}`);
    return updateDoc(categoryDocumentReferense, { ...discount });
  }
  deleteFirebase(id: string) {
    const categoryDocumentReferense = doc(this.afs, `discounts/${id}`);
    return deleteDoc(categoryDocumentReferense);
  }
  getOneFirebase(id: string) {
    const categoryDocumentReferense = doc(this.afs, `discounts/${id}`);
    return docData(categoryDocumentReferense, { idField: 'id' });
  }
}
