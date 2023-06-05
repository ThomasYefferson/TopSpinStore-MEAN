import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/services/Messages/messages.service';
import { PeticionService } from '../../services/Peticion/peticion.service';
import { RequestProductsService } from 'src/app/services/RequestProducts/request-products.service';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit{

  constructor(private actroute:ActivatedRoute,
              private RequestProduct:RequestProductsService,
              private msg:MessagesService){}
  ngOnInit(): void {

    this.CargarId(this.actroute.snapshot.params["identificador"])

  }

  codigo:string = ""
  nombre:string = ""
  precio:string = ""
  categorias:string =""
  Id:string =""

  CargarId(id:string){
    this.Id =id
    this.RequestProduct.LoadById(id).then(
      (res:any) => {
        if(res.state == true){
          this.codigo = res.data.codigo
          this.nombre = res.data.nombre
          this.precio = res.data.precio
          this.categorias = res.data.categorias

        }
        else{
          this.msg.load("danger",res.mensaje, 5000)

        }
    }
    )


  }


}
