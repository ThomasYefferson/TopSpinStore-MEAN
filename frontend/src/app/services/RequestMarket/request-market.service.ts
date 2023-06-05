import { Injectable } from '@angular/core';
import { Market } from 'src/app/interfaces/store-interfaces';
import { PeticionService } from '../Peticion/peticion.service';

@Injectable({
  providedIn: 'root'
})
export class RequestMarketService {

  constructor(private Peticion: PeticionService) { }



  AddMarket(Paylod:{User_id:string, Product_id: Market['Product_id']}) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Market/AddMarket',
      Payload: Paylod,
    }
    console.log(Post)
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  UpdateQuantity(Payload: {User_id:string, Id: Market['_id'], Quantity: Market['Quantity'] }) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Market/UpdateQuantity',
      Payload: Payload
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  LoadMyMarket(User_id:string) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Market/LoadMyMarket',
      Payload: { User_id }
    }

    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  DeleteItem(Payload: {_id: Market['_id'], User_id:string}) {

    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Market/DeleteItem',
      Payload: Payload
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  DeleteAllItem(Payload:{User_id:string}) {

    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Market/DeleteAllItem',
      Payload: { }
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  SubMyMartket(Payload:{User_id:string,_id:Market['_id']}) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Market/SubMyMartket',
      Payload: Payload
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }
}
