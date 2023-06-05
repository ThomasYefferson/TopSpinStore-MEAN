import { Component, OnInit } from '@angular/core';
import { UserSession } from 'src/app/interfaces/store-interfaces';
import { Router } from '@angular/router';
import { RequestUsersService } from 'src/app/services/RequestUsers/request-users.service';
import { SwitchService } from 'src/app/services/Switches/switch.service';
import { MessagesService } from 'src/app/services/Messages/messages.service';
import { PeticionService } from 'src/app/services/Peticion/peticion.service';

declare var $: any
@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  /**  DECLARACIÓN DE VARIABLES  */
  Name: UserSession["Name"] = ""
  UserSession: [UserSession] = [{ User_id: "", Name: "" }]

  Id: string = "";
  Rol: number = 2;
  Cedula: string = "";
  LastName: string = "";
  Email: string = "";
  Age: string = "";
  Address: string = "";
  Phone: string = "";
  DataLoggedIn: any;
  /**   PATH IMAGE  **/
  destino: any= this.Peticion.urlLocal;
  path: string = "/imagenfotos"
  LoggedForm: any;

  constructor(private Router: Router,
    private RequestUsers: RequestUsersService,
    private Peticion: PeticionService,
    private LoggedSwitch: SwitchService,
    private Message: MessagesService,
  ) { }

  ngOnInit(): void {
    this.VerCookies()
    this.LoadById(this.UserSession[0].User_id)
  }

    /*************** MODAL *****************/
    OpenModal() {
      $('#modaldatos').modal('show')
    }

    CloseModal() {
      $('#modaldatos').modal('hide')
    }

  LogOut(): void {
    this.RequestUsers.CloseSession().then(() => {
        this.Router.navigate(['/'])
      })
    this.UserSession = [{ User_id: "", Name: "" , Rol: ""}]
    this.LoggedSwitch.$LookUpLoggedIn.emit(false)
  }

  ConfigLoggedIn() {
    if (this.UserSession[0].Rol == 2) {
      this.RequestUsers.NavigatePermit().then(
        (Response: any) => {
          this.DataLoggedIn = Response.Data.MenuLog
        })
    }
  }

  LoadById(Id: string) {
    this.RequestUsers.LoadById(Id)
      .then((Response: any) => {
        if (Response.state == true) {
          /******  Required Fields  ******/
          this.Rol = Response.data.Rol
          this.Name = Response.data.Name
          this.Email = Response.data.Email
          /******  Optional Fields  ******/
          if (Response.data.Address != undefined) { this.Address = Response.data.Address }
          $('#modaldatos').modal('show')
        } else {
          this.Message.load("danger", Response.message, 5000)
        }
      })
  }

  VerCookies() {
    this.RequestUsers.ViewCookie().then((response: any) => {
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
