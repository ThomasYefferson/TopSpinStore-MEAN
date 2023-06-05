import { Injectable } from '@angular/core';
import { Category } from 'src/app/interfaces/store-interfaces';
import { MessagesService } from '../Messages/messages.service';
import { PeticionService } from '../Peticion/peticion.service';

declare var $: any

@Injectable({
  providedIn: 'root'
})
export class RequestCategoryService {

  constructor(private Peticion: PeticionService, private Message: MessagesService) { }

  /*********************************  SAVE CATEGORY  **********************************/
  CategorySave(Payload:Category) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Category/Save',
      Payload: Payload,
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  /*********************************  LOAD CATEGORY  **********************************/
  LoadAllCategory() {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Category/LoadAllCategory',
      Payload: {},
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  LoadById(Id: string) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Category/LoadById',
      Payload: { _id: Id }
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  /*********************************  UPDATE CATEGORY  **********************************/
  UpdateById(Payload:Category) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Category/UpdateById',
      Payload: Payload
    }
    console.log(Post.Payload)
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  /*********************************  DELETE CATEGORY  **********************************/
  DeleteById(_id: string) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Category/DeleteById',
      Payload: { _id: _id }
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }
}


