import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service'
import {ProductModel} from './product.model'
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  
  title:String = "Products" 
  
  products: ProductModel[];
  imageWidth: number=50;
  imageMargin: number=2;

  showImage:boolean=false;
  toggleImage(): void
  {
    this.showImage = !this.showImage;
  }


 
 
  constructor(private productService:ProductService,private router: Router,public auth:AuthenticationService) { }

  ngOnInit(): void {
    this.loadProducts();
  }


  loadProducts()
  {
    this.productService.getProducts()
     .subscribe((data)=>{
       this.products = JSON.parse(JSON.stringify(data))
     })
  }


 deleteItem(product)
 {
   this.productService.deleteProduct(product._id)
   .subscribe(res => {
    this.loadProducts();   
  })   
 }


 
edit(product)                                          
 {
   this.productService.toEdit(product);  
   this.router.navigate(['/edit'])
 }

 // On clicking edit button, edit()  is called and product is passed.
// edit() calls toEdit() which is inside service file. toEdit() stores the product details to a variable inside service file
//when edit page is loaded ngOnInit() calls a function  getEditItem() which is inside service file. This getEdit() returns
//the detais of product to be edited is loaded into edit form

}



