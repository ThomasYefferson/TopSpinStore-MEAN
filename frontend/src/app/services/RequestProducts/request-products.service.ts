import { Injectable } from '@angular/core';
import { PeticionService } from '../Peticion/peticion.service';
import { MessagesService } from '../Messages/messages.service';

import { Products } from 'src/app/interfaces/store-interfaces';
declare var $: any;
declare var swal: any;

@Injectable({
  providedIn: 'root'
})

export class RequestProductsService {
  constructor(private Peticion: PeticionService, private msg: MessagesService) {

  }
  destino:string = this.Peticion.urlLocal
  path:string = '/imagenproductos'//nombre opcional
  ngOnInit(): void {
  }

  ProductSave(Payload: Products) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Products/Save',
      Payload: Payload,
    }
    console.log(Post)
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  LoadAllProducts() {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Products/LoadAllProducts',
      Payload: {}
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  LoadById(Id: string) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Products/LoadById',
      Payload: { Id: Id }
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  UpdateById(Payload: Products) {

    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Products/UpdateById',
      Payload: Payload
    }
    console.log(Payload)
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  DeleteById(Id: string) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Products/DeleteById',
      Payload: { _id: Id }
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }
}
