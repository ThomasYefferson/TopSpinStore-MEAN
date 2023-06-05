import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { event } from 'jquery';
import { UploadfilesService } from '../../services/UploadFiles/uploadfiles.service';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent implements OnInit {
  constructor(private UploadService: UploadfilesService) {


  }
  ngOnInit(): void {
  }

  SelectedFiles: any
  ArchivoSelecionado: any
  Progress: number = 0
  FileName: string = ""
  Message = ""
  State: boolean = false

  @Input() urldestino: string = ""
  @Input() path: string = ""
  @Input() inputName: string = ""

  selectfile(event: any) {
    this.SelectedFiles = event.target.files
    this.FileName = this.SelectedFiles[0].name
  }

  upload() {
    this.Message = ""
    this.Progress = 0
    this.ArchivoSelecionado = this.SelectedFiles.item(0)

    this.UploadService.upload(this.ArchivoSelecionado, this.urldestino + this.path, this.inputName).subscribe(
      (event: any) => {

        if (event.type == HttpEventType.UploadProgress) {
          this.Progress = Math.round(100 * event.loaded / event.total)

        }
        else if (event instanceof HttpResponse) {
          this.Message = event.body.mensaje
          console.log(event.body)
          this.State = event.body.state
          if (event.body.state == false) {
            this.FileName = ""
          }
        }
      }
    )
  }
}