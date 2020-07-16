import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product-list/product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  title: String="Edit Product";

  productItem = new ProductModel(null,null,null,null,null,null,null,null)

  constructor(private productService:ProductService,private router: Router) { }

  ngOnInit(): void {
   this.productItem=this.productService.getEditItem()
  }


  updateProduct()                                           //Initiated on clicking update button
  {
    this.productService.updateItem(this.productItem)        
    console.log("function called")
    alert("success")
    this.router.navigate(['/'])
  }
}
