import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadfilesService {

  constructor(private http: HttpClient) { }

  upload(file: File, url:string, inputName: string){

    const formData = new FormData();
    formData.append(inputName,file)


    const req = new HttpRequest('POST', url,formData,{

      reportProgress:true,
      responseType:'json'
    })

    return this.http.request(req)

  }
}
