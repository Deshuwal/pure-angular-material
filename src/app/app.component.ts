import { Component,AfterViewInit, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { DialogComponent } from './dialog/dialog.component';
import { ServiceApiService } from './services/service-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'using materials';

  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog:MatDialog, 
    private api : ServiceApiService
  ){}
  
  ngOnInit(): void{
    this.getAllInfo();
  }
 
  //setting a method component as a dialog display
  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'35%'
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
        this.getAllInfo();
      }
    })
  }
  //calling the dialog box for edit
  editProduct(row: any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        this.getAllInfo();
      }
    })
  }
  //calling the delete operation
  delProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert('Product Deleted Succesfully');
      },
      error:(err) =>{
        alert('error occur while deleting a product');
      }
    })
    this.getAllInfo();
  }
  
  //setting the display method before calling it into the ngonit method
  getAllInfo(){
    this.api.displayProduct()//calling the service of product
    .subscribe({
      next:(_res:any)=>{
        this.dataSource =new MatTableDataSource(_res);
        this.dataSource.paginator =this.paginator;
        this.dataSource.sort =this.sort;
      },
      error:(err)=>{
        alert("Error while fetching data!!!")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
