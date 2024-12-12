import { OrdersComponent } from './component/orders/orders.component';

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/RegisterComponent';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductComponent } from './component/product/product.component';
import { BrandsComponent } from './component/brands/brands.component';
import { CategoriesComponent } from './component/categories/categories.component';

import { outhGuard } from './core/guard/outh.guard';
import { DetailsComponent } from './component/details/details.component';
import { logedGuard } from './core/guard/loged.guard';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { AllordersComponent } from './component/allorders/allorders.component';
import { CategoeyDetailsComponent } from './component/categoey-details/categoey-details.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';


export const routes: Routes = [
{path:'', component:AuthLayoutComponent , canActivate:[logedGuard],
    children:[
    {path:'' ,redirectTo:"login",pathMatch:"full"},
    {path:"login",component:LoginComponent,title:"login" , },
    {path:"register",component:RegisterComponent ,title:"register"},
    {path:"forget",component:ForgetPasswordComponent}
] },


{path:'',component:BlankLayoutComponent , canActivate:[outhGuard]
    ,children:[
    {path:'',redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent   },
    {path:"cart",component:CartComponent     },
    {path:"products",loadComponent:()=> import('./component/product/product.component').then((c)=> c.ProductComponent)  },
    {path:"brands",loadComponent:()=> import('./component/brands/brands.component').then((c)=> c.BrandsComponent)  },
    {path:"categories",component:CategoriesComponent   },
    {path:"wishlist",component:WishlistComponent   },
    {path:"details/:id",component:DetailsComponent  },
    {path:"allorders",component:AllordersComponent  },
    {path:"orders/:id",component:OrdersComponent },
    {path:"catrgoeyDetails/:id",component:CategoeyDetailsComponent },


]},
{path:"**" ,component:NotfoundComponent}











];
