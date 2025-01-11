import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'product-details/:productId', component: ProductDetailsComponent },
  { path :'shopping-Cart' , component: CartComponent},
  { path: 'shoppingCartTest',component: ShoppingCartComponent},
  { path :'login' , component: LoginComponent} ,
  { path :'signup' ,component:SignupComponent}
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
