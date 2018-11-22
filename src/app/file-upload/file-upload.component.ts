import { Component, EventEmitter, OnInit, Input, Output, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import 'rxjs/add/operator/toPromise';
import 'jquery';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [FileUploadService]
})
export class FileUploadComponent implements OnInit {

  /*
  fileUrl = "";
  private _fileLocation = "";
  */

  /*
  @Input()
  set fileLocation(fileLocation: string) {
    this._fileLocation = fileLocation;
    console.log('set');
  }

  get fileLocation(): string {
    return this._fileLocation;
  }
  */

  @Output() uploaded = new EventEmitter<String>();

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(public fileUploadService: FileUploadService) {

  }

  ngOnInit() {
  }

  /*
  ngOnChanges(changes:{[propKey:string]: SimpleChange}) {
    //let log: string[] = [];
    this.clearFile();
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        console.log(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        console.log(`${propName} changed from ${from} to ${to}`);
      }
    }
  }
  */

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      return this.fileUploadService.addFile(file)
        .toPromise()
        .then(
          result => {
            console.log('result');
            console.log(result);
            this.uploaded.emit(result.filepath);
          },
          () => {
           console.log('file change updated.');
        })
        .catch((error) => {
          if (error === 'Server error') {
            console.log('Could not connect to REST server. Please check your configuration details');
          } else {
            console.log(error);
          }
        });
    }
  }

  clearFile() {
    this.fileInput.nativeElement.value = "";
  }
}
