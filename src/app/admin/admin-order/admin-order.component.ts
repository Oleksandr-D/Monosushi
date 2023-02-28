import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  dateAndtime: string;
  position: number;
  weight: number;
  products:string;
  symbol: string;
  status:string
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, dateAndtime: 'Hydrogen', weight: 1.0079, products:'products', symbol: 'H', status:''},
  {position: 2, dateAndtime: 'Helium', weight: 4.0026, products:'products', symbol: 'He', status:''},
  {position: 3, dateAndtime: 'Lithium', weight: 6.941, products:'products', symbol: 'Li', status:''},
  {position: 4, dateAndtime: 'Beryllium', weight: 9.0122, products:'products', symbol: 'Be', status:''},
  {position: 5, dateAndtime: 'Boron', weight: 10.811, products:'products', symbol: 'B', status:''},
  {position: 6, dateAndtime: 'Carbon', weight: 12.0107, products:'products', symbol: 'C', status:''},
  {position: 7, dateAndtime: 'Nitrogen', weight: 14.0067, products:'products', symbol: 'N', status:''},
];
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {
  displayedColumns: string[] = ['position', 'dateAndtime', 'weight','products', 'symbol', 'status'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
