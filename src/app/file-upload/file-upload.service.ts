import { Injectable } from '@angular/core';
import { FileService } from '../file.service';
import { Observable } from 'rxjs/Observable';
import { SampleFile } from '../SampleFile';

/*import { File } from '../file';*/
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class FileUploadService {

  private NAMESPACE = 'file';

  constructor(private fileService: FileService<SampleFile>) {
  };


  public addFile(fileToAdd: any): Observable<SampleFile> {
    return this.fileService.upload(fileToAdd);
  }

}
