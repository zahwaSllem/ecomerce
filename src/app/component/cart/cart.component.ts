import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/serves/cart.service';
import { Cart } from '../../core/interfaces/cart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  implements OnInit, OnDestroy {

 private readonly _CartService=inject(CartService);
 private readonly ToastrService =inject(ToastrService);

  cartSub!:Subscription
  
cartDetails:Cart={} as Cart;


ngOnInit(): void {
  this.cartSub=  this._CartService.getProudctsCart().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.cartDetails=res.data
      

    },error:(err)=>{
      console.log(err);
      
    }
  })
}


ngOnDestroy(): void {
  this.cartSub?.unsubscribe()
}
removeItem(id:string):void{
  this._CartService.deletSpecificCartItem(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartDetails =res.data;
      this._CartService.cartNamber.next( res.numOfCartItems)
      this.ToastrService.success( 'ItemDeleted' ,'FreshCart')
      
    },error:(err)=>{
       console.log(err ,"error");
       
    }
  })
}



updateCount(id:string, newCount:number ):void{
if (newCount>0) {
  
this._CartService.updateProductQuantity(id, newCount).subscribe({
  next:(res)=>{
    console.log(res);
    this.cartDetails =res.data;
    this.ToastrService.success(res.status, 'FreshCart')
    
  },error:(err)=>{
    console.log(err);
    
  }
})

}else{
  this.removeItem(id)
}

}



clearItem():void{
  this._CartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res);
      if (res.message =='success') {
        this.cartDetails = {} as Cart;
        this.ToastrService.success('CartCleared', 'FreshCart');
        this._CartService.cartNamber.next(0)
      }
      
    },error:(err)=>{
      console.log(err);
      
    }
  })
}


}
