import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FileService<Type> {

  private resolveSuffix = '?resolve=true';
  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.actionUrl = 'http://localhost:8000/api';
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getSingle(ns: string, id: string): Observable<Type> {
    console.log('GetSingle ' + ns);

    return this.http.get(this.actionUrl + ns + '/' + id + this.resolveSuffix)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public upload(file: File): Observable<Type> {
    console.log('Entered FileService add');
    console.log('upload' );
    console.log('file', file);
    console.log('url', this.actionUrl + '/upload/');
    const fd = new FormData();
    fd.append('sampleFile', file);

    return this.http.post(this.actionUrl + '/upload/', fd)
      .map(this.extractData)
      .catch(this.handleError);
}

  private extractData(res: Response): any {
    return res.json();
  }

  private handleError(error: any): Observable<string> {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}

