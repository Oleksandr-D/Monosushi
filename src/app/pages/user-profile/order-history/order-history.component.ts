import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  dateAndtime: string;
  position: number;
  weight: number;
  symbol: string;
  status:string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, dateAndtime: 'Hydrogen', weight: 1.0079, symbol: 'H', status:''},
  {position: 2, dateAndtime: 'Helium', weight: 4.0026, symbol: 'He', status:''},
  {position: 3, dateAndtime: 'Lithium', weight: 6.941, symbol: 'Li', status:''},
  {position: 4, dateAndtime: 'Beryllium', weight: 9.0122, symbol: 'Be', status:''},
  {position: 5, dateAndtime: 'Boron', weight: 10.811, symbol: 'B', status:''},
  {position: 6, dateAndtime: 'Carbon', weight: 12.0107, symbol: 'C', status:''},
  {position: 7, dateAndtime: 'Nitrogen', weight: 14.0067, symbol: 'N', status:''},
  {position: 8, dateAndtime: 'Oxygen', weight: 15.9994, symbol: 'O', status:''},
  {position: 9, dateAndtime: 'Fluorine', weight: 18.9984, symbol: 'F', status:''},
  {position: 10, dateAndtime: 'Neon', weight: 20.1797, symbol: 'Ne', status:''},
];

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'dateAndtime', 'weight', 'symbol', 'status'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
