import { Component, OnInit } from '@angular/core';
import { Category, NamesFormat } from 'src/app/interfaces/store-interfaces';
import { MessagesService } from 'src/app/services/Messages/messages.service';
import { PeticionService } from 'src/app/services/Peticion/peticion.service';
import { RequestCategoryService } from 'src/app/services/RequestCategory/request-category.service';

declare var $: any
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  /**  DECLARACIÓN DE VARIABLES  */
  Id: string = "";
  Code: string = "";
  Name: string = "";
  ListCategory: [Category] = [{Code: "", Name: ""}];

  destino: any= this.Peticion.urlLocal;
  path: string = "/imagenproductos"

  constructor(public RequestCategory: RequestCategoryService,
    private Peticion:PeticionService,
    private Message: MessagesService,) { }

  ngOnInit(): void {
    this.LoadAllCategories()
  }

  // destino:string = this.peticion-urlLocal
  //path:string = '/subir/imagenproductos'

  /*************** MODAL *****************/
  OpenModal() {
    $('#modaldatos').modal('show')
  }

  CloseModal() {
    $('#modaldatos').modal('hide')
    this.Nuevo()
  }

  /*************** BUTTON NUEVO *****************/
  Nuevo() {
    this.Id = ""
    this.Code = ""
    this.Name = ""
  }

  /*************** CARGAR DATOS *****************/
  LoadAllCategories() {
    this.RequestCategory.LoadAllCategory().then((Response: any) => {
      this.ListCategory = Response.data
    })
  }
  LoadById(Id: string) {
    this.Id = Id
    this.RequestCategory.LoadById(Id)
      .then((Response: any) => {
        if (Response.state == true) {
          this.Code = Response.data.Code
          this.Name = Response.data.Name
          this.path = this.path + '/' + this.Id
          $('#modaldatos').modal('show')
        } else {
          this.Message.load("danger", Response.data.mensaje, 5000)
        }
      })
  }

  /*************** BUTTON GUARDAR *****************/
  Save() {
    this.RequestCategory.CategorySave({
      Code: this.Code,
      Name: NamesFormat(this.Name),

    }).then((Response: any) => {
      if (Response.state == true) {
        this.Message.load("success", Response.mensaje, 5000)
        this.LoadAllCategories()
        this.Nuevo()
        $('#modaldatos').modal('hide')
      }
      else if (Response.state == false) {
        $('#modaldatos').modal('hide')
        this.Message.load("danger", Response.mensaje, 5000)
      }
    })
  }

  /*************** BUTTON ACTUALIZAR *****************/
  UpdateById() {
    this.RequestCategory.UpdateById({
      _id: this.Id,
      Code: this.Code,
      Name: NamesFormat(this.Name),
    }).then((Response: any) => {
      if (Response.state == true) {
        this.Message.load("success", Response.mensaje, 5000)
        this.LoadAllCategories()
        this.Nuevo()
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
        this.Message.MessageOne('Deleted!', 'The category has been successfully removed.', 'center', 'success', 1000, false)
        this.RequestCategory.DeleteById(this.Id).then(() => {
          this.LoadAllCategories()
          this.Nuevo()
          $('#modaldatos').modal('hide')
        })
      }
    })
  }
}

