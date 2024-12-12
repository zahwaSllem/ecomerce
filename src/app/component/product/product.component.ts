import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/serves/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/serves/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent  implements OnInit , OnDestroy{
 private   readonly _ProductsService= inject(ProductsService)
 private   readonly _CartService= inject(CartService)
 private readonly ToastrService =inject(ToastrService);

 getAllProductSub!:Subscription;

 allproduct:IProduct[]=[]

 ngOnInit(): void {
    this.getAllProductSub = this._ProductsService.getAllProduct().subscribe({
    next:(res)=>{
  console.log(res.data);
  this.allproduct=res.data
  
    },error:(err)=>{
      console.log(err)
    }
  })
   
 }

 ngOnDestroy(): void {
  this.getAllProductSub?.unsubscribe();
}

 addCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next: (res) =>{
      console.log(res);
      this.ToastrService.success(res.message, 'FreshCart');
      this._CartService.cartNamber.next ( res.numOfCartItems) ;
      console.log( this._CartService.cartNamber  );
      
    },error:(err)=>{
      console.log('error', err)
    }
  })
}


}
