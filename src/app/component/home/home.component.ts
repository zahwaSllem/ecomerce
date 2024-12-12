
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from './../../core/serves/products.service';
import { Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CateoriesService } from '../../core/serves/cateories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { CartService } from '../../core/serves/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CarouselModule ,RouterLink , UpperCasePipe,  LowerCasePipe, TitleCasePipe, SlicePipe,CurrencyPipe ,DatePipe,JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{
 getAllProductSub!:Subscription;

 customOptionsMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true, 
  pullDrag: true,
  rtl:true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
  1110: {
      items: 1
    }
  },
  nav: true
}

 customOptionsCat: OwlOptions = {
  loop: true,
  mouseDrag: true,
  rtl:true,
  touchDrag: true, 
  pullDrag: true,
  autoplay:true,
  autoplayTimeout:2000,
  autoplayHoverPause:true,
  dots: true,
  navSpeed: 700,
  navText: ['prev', 'next'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
,
  1110: {
      items: 6
    }
  },
  nav: true
}


  private _customOptionsImage: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },

      1110: {
        items: 6
      }
    },
    nav: true
  };
  public get customOptionsImage(): OwlOptions {
    return this._customOptionsImage;
  }
  public set customOptionsImage(value: OwlOptions) {
    this._customOptionsImage = value;
  }

 private readonly _ProductsService =  inject(ProductsService)
 private readonly _CateoriesService =  inject(CateoriesService);
 private readonly _CartService =inject(CartService);
 private readonly _WishlistService =inject(WishlistService);
 private readonly ToastrService =inject(ToastrService);
 private readonly _NgxSpinnerService =inject(NgxSpinnerService);






  productList:IProduct[]=[];
  categoriesList: ICategory []=[]



ngOnInit(): void {

  this._NgxSpinnerService.show('loading-2')
   this.getAllProductSub= this._ProductsService.getAllProduct().subscribe({
    next: (res) =>{
      console.log(res.data);
      this._NgxSpinnerService.hide('loading-2');
      this.productList=res.data;
    },error:(err)=> {
      console.log(err)
      
    },
  });


   this._NgxSpinnerService.show('loading-2')
  this._CateoriesService.getAllCategories().subscribe({
    next: (res) =>{
      console.log(res.data);
      this._NgxSpinnerService.hide('loading-2');
      this.categoriesList =res.data;
    },error:(err)=> {
      console.log(err);
      
    },
  })
}
 ngOnDestroy():void{
  this.getAllProductSub?.unsubscribe;





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



addToWish(id:string):void{
  this._WishlistService.addProductTowishlist(id).subscribe({
    next: (res) =>{
      console.log(res);
      
      
    },error:(err)=>{
      console.log('error YAzozzzzzzzzz', err)
    }
  })
}




date =new Date();

}
