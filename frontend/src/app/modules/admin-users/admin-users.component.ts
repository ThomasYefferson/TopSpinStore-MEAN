import { Component, OnInit } from '@angular/core';
import { Users, maritalStatus, NamesFormat } from 'src/app/interfaces/store-interfaces';
import { MessagesService } from 'src/app/services/Messages/messages.service';
import { RequestUsersService } from 'src/app/services/RequestUsers/request-users.service';

declare var $: any;
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {
  /**  DECLARACIÓN DE VARIABLES  */
  Id: string = "";
  Rol: number = 2;
  Cedula: string = "";
  Name: string = "";
  LastName: string = "";
  Email: string = "";
  Password: string = "";
  Age: string = "";
  Address: string = "";
  Phone: string = "";
  State: number = 0;
  MaritalStatus: maritalStatus = "";
  ListUsers!: [Users];

  MaritalS: Array<{ value: maritalStatus }> = [
    { value: 'Soltero(a)' }, { value: 'Casado(a)' }, { value: 'Separado(a)' }, { value: 'Divorciado(a)' }, { value: 'Union Libre' }, { value: 'Viudo(a)' }
  ];

  Roles: Array<{ Id: number, Name: string }> = [
    { Id: 1, Name: 'Manager', }, { Id: 2, Name: 'Customer' }
  ]

  States: Array<{ Id: number, Name: string }> = [
    { Id: 0, Name: 'Pending Activation...', }, { Id: 1, Name: 'Active' }
  ]

  constructor(public RequestUser: RequestUsersService,
              private Message: MessagesService,) { }

  ngOnInit(): void {
    this.LoadAllUsers()
  }

  /*************** MODAL *****************/
  OpenModal() {
    $('#modaldatos').modal('handleUpdate')
    $('#modaldatos').modal('show')

  }

  CloseModal() {
    $('#modaldatos').modal('hide')
    this.New()
  }

  /*************** BUTTON NUEVO *****************/
  New() {
    this.Id = ""
    this.Rol = 2
    this.Cedula = ""
    this.Name = ""
    this.LastName = ""
    this.Email = ""
    this.State = 0
    this.Age = ""
    this.Phone = ""
    this.Address = ""
  }

  LoadAllUsers() {
    this.RequestUser.LoadAllUsers().then((Response: any) => {
      this.ListUsers = Response.data })
  }

  LoadById(Id: string) {
    this.Id = Id
    this.RequestUser.LoadById(Id)
      .then((Response: any) => {
        if (Response.state == true) {
          /******  Required Fields  ******/
          this.Rol = Response.data.Rol
          this.Cedula = Response.data.Cedula
          this.Name = Response.data.Name
          this.Email = Response.data.Email
          /******  Optional Fields  ******/
          if (Response.data.LastName != undefined) { this.LastName = Response.data.LastName }
          if (Response.data.Age != undefined) { this.Age = Response.data.Age }
          if (Response.data.Phone != undefined) { this.Phone = Response.data.Phone }
          if (Response.data.Address != undefined) { this.Address = Response.data.Address }
          $('#modaldatos').modal('show')
        } else {
          this.Message.load("danger", Response.data.mensaje, 5000)
        }
      })
  }
  /*************** BUTTON GUARDAR *****************/
  Save() {
    this.RequestUser.UsersSave({
      Rol: this.Rol,
      Cedula: this.Cedula,
      Name: NamesFormat(this.Name),
      LastName: NamesFormat(this.LastName),
      Email: this.Email,
      Age: this.Age,
      Phone: this.Phone,
      Address: this.Address
    }).then((Response: any) => {
      if (Response.state == true) {
        this.Message.load("success", Response.mensaje, 5000)
        this.RequestUser.LoadAllUsers()
        this.New()
        $('#modaldatos').modal('hide')
      }
      else {
        this.Message.load("danger", Response.mensaje, 5000)
      }
    })
  }

  /*************** BUTTON ACTUALIZAR *****************/
  UpdateById() {

    this.RequestUser.UpdateById({
      _id: this.Id,
      Rol: this.Rol,
      Cedula: this.Cedula,
      Name: this.Name.trim(),
      LastName: this.LastName,
      Email: this.Email.trim(),
      Age: this.Age,
      Phone: this.Phone,
      Address: this.Address,
    }).then((Response: any) => {
      if (Response.state == true) {
        this.Message.load("success", Response.mensaje, 5000)
        this.LoadAllUsers()
        this.New()
        $('#modaldatos').modal('hide')
      }
      else {
        this.Message.load("danger", Response.mensaje, 5000)
      }
    })
  }

  /***************  BUTTON ELIMINAR  ******************/
  DeleteById() {
    this.Message.MessageDelete().then((willDelete) => {
      if (willDelete.isConfirmed) {
        this.Message.MessageOne('Deleted!', 'The product has been successfully removed.', 'center', 'success', 1000, false)
        this.RequestUser.DeleteById(this.Id).then(() => {
          this.LoadAllUsers()
          this.New()
          $('#modaldatos').modal('hide')
        })
      }
    })
  }
}
