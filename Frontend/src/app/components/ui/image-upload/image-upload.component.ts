import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  fileName = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {

        console.log(file);
        this.fileName = file.name;

    }

  }

}
