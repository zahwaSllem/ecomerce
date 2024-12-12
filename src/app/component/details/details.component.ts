import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/serves/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/serves/cart.service';
import { ToastrService } from 'ngx-toastr';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent  implements OnInit ,OnDestroy{
 

  customOptionDet: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 2
      }
    },
    nav: true
  }

  private readonly  _ActivatedRoute =inject(ActivatedRoute);
  private readonly  _ProductsService =inject(ProductsService);
  private readonly _CartService =inject(CartService);
  private readonly ToastrService =inject(ToastrService);
   
  detailsSub!:Subscription;
  detailsProduct:IProduct |null =null;



  ngOnInit(): void {
      this.detailsSub=  this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        console.log(params);
        
        let idProudct= params.get('id')

        


       this._ProductsService.getSpeificProducts(idProudct).subscribe({
        next: (res) => {
          console.log(res.data ,"zahwasa7");
          this.detailsProduct = res.data;
          




        
        },
        error: (err) => {
          console.log(err, "zahwa8alt");
        }
    

       })

        
      }


    })
  }

  ngOnDestroy(): void {
    this.detailsSub?.unsubscribe()
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
 