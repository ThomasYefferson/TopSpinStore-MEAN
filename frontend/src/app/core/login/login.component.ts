import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSession } from 'src/app/interfaces/store-interfaces';
import { MessagesService } from 'src/app/services/Messages/messages.service';
import { RequestUsersService } from 'src/app/services/RequestUsers/request-users.service';
import { SwitchService } from 'src/app/services/Switches/switch.service';
import { ValidateUserService } from 'src/app/services/ValidateUser/validate-user.service';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  RegisterState: Boolean = false;

  /*  LOGIN FORM MESSAGES */
  msn_Register: string = ""
  /*  INPUT FIELDS */
  Email: string = ""
  Password: string = ""
  /*  LOGIN MESSAGES */
  msn_Email: string = ""
  msn_Password: string = ""
  /**/
  UserSession: [UserSession] = [{User_id:"", Name: ""}]

  constructor(
    // Services Calls
    private router: Router,
    private LoginSwitch: SwitchService,
    private RequestUsers: RequestUsersService,
    private Messages: MessagesService,
    private Validate: ValidateUserService,
  ) { }


  ngOnInit(): void {
    this.LoginSwitch.$LookUpRegister.subscribe((req) => this.RegisterState = req)
  }

  /* OPEN REGISTER FORM */
  OpenRegister(): void {
    this.RegisterState = true;
    }

  /* CLEAR FIELDS */
  ClearFields(): void {
    this.Email = "", this.Password = "",
      this.msn_Email = "", this.msn_Password = ""
  }

  Login() {
    //this.router.navigate(['/Admin']);
    var CheckEmail = this.Validate.ValidateEmail(this.Email)
    var CheckPassword = this.Validate.ValidatePassword(this.Password)
    if (CheckEmail.state == false || CheckPassword.state == false) {
      if (CheckEmail.state == false) { this.msn_Email = CheckEmail.message } else { this.msn_Email = "" }
      if (CheckPassword.state == false) { this.msn_Password = CheckPassword.message } else { this.msn_Password = "" }
    }
    else {
      this.RequestUsers.Login({ Email: this.Email, Password: this.Password }).then((respuesta: any) => {
        if (respuesta.state == true) {
          this.Messages.load('success', respuesta.mensaje, 5000)
          this.router.navigate([])}
        else {
          this.Messages.load('danger', respuesta.mensaje, 5000)}
      })
      this.LoginSwitch.$LookUpLogin.emit(false)
    }
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
