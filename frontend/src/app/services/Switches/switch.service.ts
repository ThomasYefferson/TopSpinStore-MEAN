import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { UserSession } from 'src/app/interfaces/store-interfaces';


@Injectable({
  providedIn: 'root'
})
export class SwitchService {
  // observable of the SwitchService instance
  $LookUpRegister = new EventEmitter<any>();
  $LookUpLogin = new EventEmitter<any>();
  $LookUpLoggedIn = new EventEmitter<any>();
  $SelectHeaderMenú = new EventEmitter<any>()

  constructor() { }
}
