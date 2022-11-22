import { Component, Inject, OnInit } from '@angular/core';
// import form modules for forms
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ServiceApiService} from '../services/service-api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  // setting array of product quality
  freshnessList =["Brand-New","Second-Hand","Refurbished"]

  //initalizing form-group varaible
  productForm! :FormGroup;

  actionBtn:string ="Save";
  actionBtn1:string ="Add Product Form";
  //for the mat dialog data we inject it in he constructor which as a name for any data that will be coming in 
  constructor(
    private fBuilder:FormBuilder,
    private api:ServiceApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>
    
    ) { }

  ngOnInit(): void {
    //grouping the name-variable from the html into a formbuilder object
    this.productForm =this.fBuilder.group({
      productName :['', Validators.required],
      category :['', Validators.required],
      freshness :['', Validators.required],
      price :['', Validators.required],
      comment :['', Validators.required],
      date : ['', Validators.required]
    })
    
    //setting data up for edit but checking first
    if(this.editData){
      //changing button appearance
      this.actionBtn ="Update";
      this.actionBtn1 ="Update Product Form";
      //this place back the data into the productForm fields
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  //setting the add function
  addProduct(){
   if(!this.editData){
     //check whether form is valid before posting it
     if(this.productForm.valid){
      //calling api post(saving) function services and passing the productform value as argument
      this.api.saveProduct(this.productForm.value)
      //setting the observables
      .subscribe({
        //if observer is success then
        next:(_res: any)=>{
          alert("Product added succesfully");
          this.productForm.reset();//this clear form fields
          this.dialogRef.close('save');//close form when data is inputed successful

        },
        error:()=>{
          alert("error while adding the product");
        }
        
      })

    }
   }else{
    this.updateProduct()
   }
  }
  updateProduct(){
    this.api.updateproduct(this.productForm.value, this.editData.id)
    .subscribe({
      //when its a success
      next:(res)=>{
        // console.log(res);
        alert("Product updated successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("error while updating record");

      }
    })
  }

}
