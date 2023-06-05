import { Component, OnInit} from '@angular/core';
import { Users, maritalStatus, NamesFormat, UserSession } from 'src/app/interfaces/store-interfaces';
import { MessagesService } from 'src/app/services/Messages/messages.service';
import { RequestUsersService } from 'src/app/services/RequestUsers/request-users.service';
import { ValidateUserService } from 'src/app/services/ValidateUser/validate-user.service';

declare var $: any;
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  /**  DECLARACIÓN DE VARIABLES  */
  _id: string = "";
  Rol: number = 2;
  Cedula: string = "";
  Name: string = "";
  LastName: string = "";
  Email: string = "";
  Password: string = "";
  Age: string = "";
  Address: string = "";
  Phone: string = "";
  MaritalStatus: maritalStatus = "";
  UserSession: [UserSession] = [{ User_id: "", Name: "" }]
  ConfirmPassword: any;
  msn_CC: string ="";
  msn_Name: string ="";
  msn_LastName: string ="";
  msn_Email: string="";
  msn_Password: string="";
  msn_ConfirmPassword: string="";
  msn_Age: string="";
  msn_Phone: string="";
  msn_Address: string="";
  Datos: any;

  ListUsers:any[]=[];
  User: any[]=[];

  constructor(public RequestUser: RequestUsersService,
    private Validate: ValidateUserService,
  private Message: MessagesService,) { }

  ngOnInit(): void {
    this.RequestUser.ViewCookie().then((response: any) => {
      if (response.state == true) {
        this.RequestUser.LoadById(response.clave.User_id)
        .then((Response: any) => {
          if (Response.state == true) {
            /******  Required Fields  ******/
            this._id=Response.data._id;
            this.Cedula = Response.data.Cedula.toString()
            this.Name = Response.data.Name
            this.Email = Response.data.Email
            this.Password = Response.data.Password;
            this.ConfirmPassword = Response.data.Password;
            /******  Optional Fields  ******/
            if (Response.data.LastName != undefined) { this.LastName = Response.data.LastName }
            if (Response.data.Age != undefined) { this.Age = Response.data.Age.toString() }
            if (Response.data.Phone != undefined) { this.Phone = Response.data.Phone.toString() }
            if (Response.data.Address != undefined) { this.Address = Response.data.Address }
            $('#modaldatos').modal('show')
          } else {
            this.Message.load("danger", Response.data.mensaje, 5000)
          }
        })
      } else {
        this.UserSession = [{ User_id: '', Name: '', Rol: '' }]
      }
    })
  }

  CleanMessage(){
    this.msn_CC="";
    this.msn_Name="";
    this.msn_LastName="";
    this.msn_Email="";
    this.msn_Password="";
    this.msn_ConfirmPassword="";
    this.msn_Age="";
    this.msn_Phone="";
    this.msn_Address="";
  }

  UpdateById() {
    console.log(this.Age)
    var CheckCC = this.Validate.ValidateCC(this.Cedula)
    var CheckName = this.Validate.ValidateName(this.Name)
    var CheckEmail = this.Validate.ValidateEmail(this.Email, 'Save')
    var CheckPassword = this.Validate.ValidatePassword(this.Password, 'Save')
    var CheckConfirmPassword = this.Validate.ValidateConfirmPassword(this.ConfirmPassword, this.Password)
    var CheckPhone = this.Validate.ValidatePhone(this.Phone)
    if (CheckCC.state == false || CheckName.state == false || CheckEmail.state == false
      || CheckPassword.state == false || CheckConfirmPassword.state == false || CheckPhone.state == false) {
      if (CheckCC.state == false) { this.msn_CC = CheckCC.message } else { this.msn_CC = "" }
      if (CheckName.state == false) { this.msn_Name = CheckName.message } else { this.msn_Name = "" }
      if (CheckEmail.state == false) { this.msn_Email = CheckEmail.message } else { this.msn_Email = "" }
      if (CheckPassword.state == false) { this.msn_Password = CheckPassword.message } else { this.msn_Password = "" }
      if (CheckConfirmPassword.state == false) { this.msn_ConfirmPassword = CheckConfirmPassword.message } else { this.msn_ConfirmPassword = "" }
      if (CheckPhone.state == false) { this.msn_Phone = CheckPhone.message } else { this.msn_Phone = "" }
    }
    else {
    this.RequestUser.UpdateById({
      _id: this._id,
      Cedula:parseInt(this.Cedula),
      Name: this.Name.trim(),
      LastName: this.LastName,
      Rol:this.Rol,
      Email: this.Email.trim(),
      Password: this.Password.trim(),
      Age: this.Age,
      Phone: this.Phone,
      Address: this.Address,
    }).then((Response: any) => {
      if (Response.state == true) {
        this.Message.load("success", Response.mensaje, 5000)
        $('#modaldatos').modal('hide')
        this.CleanMessage()
        this.ngOnInit()
      }
      else {
        this.Message.load("danger", Response.mensaje, 5000)
      }
    })}

  }

  VerCookies() {
    this.RequestUser.ViewCookie().then((response: any) => {
      if (response.state == true) {
        console.log(response)
        this._id = response.clave.User_id
      } else {
        this.UserSession = [{ User_id: '', Name: '', Rol: '' }]
      }
    })
  }
}
