import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSession } from 'src/app/interfaces/store-interfaces';
import { RequestUsersService } from 'src/app/services/RequestUsers/request-users.service';
import { SwitchService } from 'src/app/services/Switches/switch.service';


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  LoginState:Boolean = false;
  UserSession: [UserSession] = [{User_id:"", Name: ""}]
  DatosMenu: any[] = [];

  constructor(private Router: Router,
              private RequestUser: RequestUsersService,
              private LoginSwitch:SwitchService){}

  ngOnInit(){
    this.LoginSwitch.$LookUpLoggedIn.subscribe((req) => this.LoginState = req)
    this.UserSession = this.RequestUser.UserLoggedIn
    this.LoadMenuBackend()
  }

  LoadMenuBackend() {
    this.RequestUser.NavigatePermit().then(
      (Response: any) => {
        this.DatosMenu = Response.Data.MenuRol
      })
  }

  LoginPrivateZoneShow():void{
    this.LoginState = !this.LoginState;
  }

}
