import { Component } from '@angular/core';
import { MessagesService } from 'src/app/services/Messages/messages.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent {
  constructor(public msj:MessagesService){}

}
