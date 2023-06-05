import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}
  RequestOptions:any = {}

  intercept(Request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(Request.method == "GET"){
      this.RequestOptions={
        Headers: new HttpHeaders({
          "Content-Type": "application/json,Charset=UTF-8",
        }),
        withCredentials: false
      }
    }
    else{
      this.RequestOptions={
        header: new HttpHeaders({"Content-Type":"application/json,Charset=UTF-8"}),withCredentials: true
      }
    }
    const RequestClone = Request.clone(this.RequestOptions)
    return next.handle(RequestClone);
  }
}
