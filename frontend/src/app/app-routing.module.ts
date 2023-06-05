import { FunctionExpr } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { HomeComponent } from './modules/home/home.component';
import { Page404Component } from './modules/page404/page404.component';
import { UserComponent } from './modules/user/user.component';
import { AdminUsersComponent } from './modules/admin-users/admin-users.component';
import { AdminCategoryComponent } from './modules/admin-category/admin-category.component';
import { AdminProductsComponent } from './modules/admin-products/admin-products.component';
import { ProductsComponent } from './modules/products/products.component';
import { UserDataComponent } from './modules/user-data/user-data.component';
import { UserPayComponent } from './modules/user-pay/user-pay.component';
import { UserShopComponent } from './modules/user-shop/user-shop.component';



const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'products/:grupo', component: ProductsComponent, pathMatch: 'full' },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: AdminUsersComponent, pathMatch: 'full' },
      { path: 'category', component: AdminCategoryComponent, pathMatch: 'full' },
      { path: 'products', component: AdminProductsComponent, pathMatch: 'full' },
    ],
  },
  {
    path: 'user', component: UserComponent,
    children:[
      { path: '', redirectTo: 'data', pathMatch: 'full' },
      { path: 'data', component: UserDataComponent, pathMatch: 'full' },
      { path: 'pay', component: UserPayComponent, pathMatch: 'full' },
      { path: 'shop', component: UserShopComponent, pathMatch: 'full'}
    ]
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
