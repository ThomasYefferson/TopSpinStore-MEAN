import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/store-interfaces';
import { RequestCategoryService } from 'src/app/services/RequestCategory/request-category.service';
import { RequestProductsService } from 'src/app/services/RequestProducts/request-products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ListProducts!: [Products];
  ListCategory: any[]= [];

  constructor(public RequestProduct:RequestProductsService,
    public RequestCategory: RequestCategoryService) { }

  public ngOnInit(): void {
    this.LoadAllProducts()
    this.LoadAllCategories()
  }

  LoadAllCategories() {
    this.RequestCategory.LoadAllCategory().then((Response: any) => {
      this.ListCategory = Response.data
    })
  }

  /*************** CARGAR DATOS *****************/
  LoadAllProducts() {
    this.RequestProduct.LoadAllProducts().then((Response: any) => {
      this.ListProducts = Response.data
    })
  }
}
