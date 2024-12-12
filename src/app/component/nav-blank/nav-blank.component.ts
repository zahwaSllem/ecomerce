import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/serves/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/serves/my-translate.service';
import { CartService } from '../../core/serves/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [ RouterLink,RouterLinkActive ,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent  implements OnInit {
  private readonly _AuthService = inject(AuthService);
  private readonly _MyTranslateService = inject(MyTranslateService);
 readonly _TranslateService=inject(TranslateService);
 private readonly _CartService = inject(CartService);
  

 countNumber:number=0;
 
logOUt():void{
  this._AuthService.logOut() 
}

change(lang:string):void{
  this._MyTranslateService.changeLang(lang)
}

 ngOnInit(): void {
  this._CartService.getProudctsCart().subscribe({
    next: (res) => {
      console.log(res ,'cartItem ');
      this._CartService.cartNamber.next(res.numOfCartItems)
    },
   
    
  })

  this._CartService.cartNamber.subscribe({
    next: (count) => this.countNumber = count,

  })
 }
}
