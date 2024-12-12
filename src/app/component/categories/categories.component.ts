import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CateoriesService } from '../../core/serves/cateories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent   implements OnInit ,OnDestroy{

  categories: ICategory[] = [];
   private readonly _CateoriesService=inject(CateoriesService)



ngOnInit(): void {

  this._CateoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data , 'feneldata');
      this.categories= res.data
    },error:(err)=>{
           console.log(err);
           
    }
  })
  
}








ngOnDestroy(): void {
  
}

}
