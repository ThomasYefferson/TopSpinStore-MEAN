import { Injectable } from '@angular/core';
import { Users, UserSession } from 'src/app/interfaces/store-interfaces';
import { MessagesService } from '../Messages/messages.service';
import { PeticionService } from '../Peticion/peticion.service';

declare var $: any

@Injectable({
  providedIn: 'root'
})
export class RequestUsersService {
  UserLoggedIn: [UserSession] = [{User_id: "", Name: ""}]

  constructor(private Peticion: PeticionService, private Message: MessagesService) { }

  /*********************************  SAVE USERS  **********************************/
  UsersSave(Payload: Users) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Users/Save',
      Payload: Payload,
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  RegisterUsers(Payload: { Cedula: string, Name: string, Email: string, Password: string }) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Users/Register',
      Payload: Payload,
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  /*********************************  LOAD USERS  **********************************/
  Login(Payload: { Email: string, Password: string }) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: "/Users/Login",
      Payload: Payload
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  LoadAllUsers() {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Users/LoadAllUsers',
      Payload: {},
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  LoadById(Id: string) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Users/LoadById',
      Payload: { _id: Id }
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  /*********************************  UPDATE USERS  **********************************/
  UpdateById(Payload: Users) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Users/UpdateById',
      Payload: Payload
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  /*********************************  DELETE USERS  **********************************/
  DeleteById(_id: string) {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: '/Users/DeleteById',
      Payload: { _id: _id }
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  /*********************************  ViewCookie USERS  **********************************/
  ViewCookie() {
    var Post = {
      Host: this.Peticion.urlLocal,
      Path: "/Users/ViewCookie",
      Payload: { }
    }
    return this.Peticion.POST(Post.Host + Post.Path, Post.Payload)
  }

  /*********************************  USERS NAVIGATION  **********************************/
  NavigatePermit(){
    var Post = {
      Host:this.Peticion.urlLocal,
      Path:"/Users/MenuRol",
      Payload:{}
    }
    return this.Peticion.POST(Post.Host + Post.Path,Post.Payload)
  }

  /*********************************  CLOSE SESSION  **********************************/
  CloseSession(){
    var Post = {
      Host:this.Peticion.urlLocal,
      Path:"/CloseSession",
      Payload:{}
    }
    return this.Peticion.POST(Post.Host + Post.Path,Post.Payload)
  }
}

