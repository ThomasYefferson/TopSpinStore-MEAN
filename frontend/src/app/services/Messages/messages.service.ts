import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


type icon = 'success' | 'warning' | 'error' | 'info' | 'question'
type position = 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  public datos: any[] = []
  private BorrarMsg(tiempo: number) {
    setTimeout(() => {
      this.datos.splice(0, 1)
    }, tiempo);
  }

    /**
   * Funcion para cargar msj
   * @param tipo //succes, info, primary, danger
   * @param mensaje // tu mensaje
   * @param tiempo //tiempo de espera
   */
    public load(tipo:string, mensaje:string,tiempo:number){
      this.datos.push({tipo:tipo, mensaje:mensaje})
      this.BorrarMsg(tiempo)
    }

  MessageOne(Title: string,
    Message: string,
    Position: position = 'center',
    Icon: icon = 'success',
    Timer: number = 2000,
    ButtonConfig: boolean = false) {
    Swal.fire({
      position: Position,
      icon: Icon,
      title: Title,
      text: Message,
      showConfirmButton: ButtonConfig,
      timer: Timer,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
  }

  MessageDelete() {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    })
  }
}
