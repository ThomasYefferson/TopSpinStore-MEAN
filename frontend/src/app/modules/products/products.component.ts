import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSession } from 'src/app/interfaces/store-interfaces';
import { PeticionService } from 'src/app/services/Peticion/peticion.service';
import { RequestMarketService } from 'src/app/services/RequestMarket/request-market.service';
import { RequestProductsService } from 'src/app/services/RequestProducts/request-products.service';
import { RequestUsersService } from 'src/app/services/RequestUsers/request-users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  Id: string = "";
  Codigo: string = "";
  Nombre: string = "";
  FechaV: string = "";
  Precio: string = "";
  Cantidad: string = "";
  Descripcion: string = "";



  route:string = ""
  Datos: any[] = []
  Description: boolean=false;
  UserSession: [UserSession] = [{ User_id: "", Name: "" }]


  constructor(public Peticion: PeticionService,
    private RequestMarket: RequestMarketService,
    public RequestProduct: RequestProductsService,
    private RequestUser: RequestUsersService,
    private actrouter: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.VerCookies()
    var Datos = this.RequestProduct.LoadAllProducts().then((Response: any) => {
      this.Datos = Response.data.filter((item: any) => parseInt(item.Categoria) == parseInt(this.actrouter.snapshot.params['grupo']))
    })
  }

  ngDoCheck() {
    var pathname = window.location.pathname;
    if(pathname!=this.route){
      this.route=pathname
      this.ngOnInit()
    }
  }

  AddMyMartket(Product_id: string) {
    this.VerCookies()
    this.RequestMarket.AddMarket({
      User_id: this.UserSession[0].User_id,
      Product_id: Product_id
    }).then((response: any) => { })
  }

  VerCookies() {
    this.RequestUser.ViewCookie().then((response: any) => {
      if (response.state == true) {
        this.UserSession = [{
          User_id: response.clave.User_id,
          Name: response.clave.Name,
          Rol: response.clave.Rol
        }]
      } else {
        this.UserSession = [{ User_id: '', Name: '', Rol: '' }]
      }
    })
  }

}
//
