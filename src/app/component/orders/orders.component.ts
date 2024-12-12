import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/serves/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

 private readonly _ActivatedRoute= inject(ActivatedRoute);
 private readonly _OrderService= inject(OrderService)

  orders:FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null)
  })



  cartId:string|null = "";

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
     console.log(params);
    this.cartId = params.get('id')
    console.log(this.cartId);
    }
  })
}


  orderSubmit():void{
    console.log(this.orders.value);
    this._OrderService.checkOut(this.cartId,this.orders.value).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.status==='success') {
          res.session.url;
          window.open( res.session.url,'_slef' )
          
        }
        
      },error:(err)=>{
       console.log(err);
       
      }
    })
    
  }




}
