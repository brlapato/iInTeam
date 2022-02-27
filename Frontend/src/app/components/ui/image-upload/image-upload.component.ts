import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  @Output() fileSelected = new EventEmitter<FileSelectedEventArgs>();

  fileName = '';
  previewUrl:any = null;

  constructor(private http: HttpClient) {}

  async onFileSelected(event: any) {
    
    let fileSelectedEventArgs: FileSelectedEventArgs = new FileSelectedEventArgs();

    for (let i: number = 0; i < event.target.files.length; i++) {
        let file: File = event.target.files[i];
      
        let selectedFileInfo: any = await this.readFileData(file);
        fileSelectedEventArgs.files.push(selectedFileInfo);
    }
          
    
    this.fileSelected.emit(fileSelectedEventArgs);
  }

  readFileData(file: File) {
    return new Promise((resolve, reject)=>{
      this.fileName = file.name;

        var previewReader = new FileReader();      
        previewReader.readAsDataURL(file); 
        previewReader.onload = (_event) => { 
          this.previewUrl = previewReader.result;
          let parts: RegExpMatchArray | null | undefined = previewReader.result?.toString().match("data:(.*?);.*?,(.*?)$");
          if (parts && parts.length > 2) {
            let selectedFileInfo: SelectedFileInfo = new SelectedFileInfo();
            selectedFileInfo.fileType = parts[1];
            selectedFileInfo.encodedFile = parts[2];
            return resolve(selectedFileInfo)
          }
        }
    })
  }

}

export class FileSelectedEventArgs {
  public files: SelectedFileInfo[] = [];
}

export class SelectedFileInfo {
  public fileType: string = '';
  public encodedFile: string = '';
}