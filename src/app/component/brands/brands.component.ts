import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/serves/products.service';

import { CommonModule } from '@angular/common';
import { IProduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent   implements OnInit ,OnDestroy{
  getbrands: IProduct[] = [];
  private readonly _ProductsService= inject(ProductsService)

 
ngOnInit(): void {
  this._ProductsService.getAllProduct().subscribe({
    next:(res)=> {
     console.log(res.data);
   this.getbrands =res.data
      
    },error:(err) =>{
      console.log(err);
      
    },
  })
}





 ngOnDestroy(): void {
   
 }
}
