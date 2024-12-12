import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { CateoriesService } from '../../core/serves/cateories.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/serves/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categoey-details',
  standalone: true,
  imports: [],
  templateUrl: './categoey-details.component.html',
  styleUrl: './categoey-details.component.scss'
})
export class CategoeyDetailsComponent  implements OnInit ,OnDestroy {



  private readonly  _ActivatedRoute =inject(ActivatedRoute);
  private readonly  _CateoriesService =inject(CateoriesService);
  private readonly _CartService =inject(CartService);
  private readonly ToastrService =inject(ToastrService);
   
  detailsSub!:Subscription;
  detailsProduct:ICategory |null =null;



  ngOnInit(): void {
      this.detailsSub=  this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        console.log(params);
        
        let idProudct= params.get('id')

        


       this._CateoriesService.getSpecificCategory(idProudct).subscribe({
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

}
