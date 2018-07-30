import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class MyErrorHandler implements ErrorHandler {
    userData: any;
    constructor(private db: AngularFireDatabase,private http: HttpClient){}

    handleError(error) {
        this.reportError(error).subscribe(data => {
            console.log(data);
        })
    }

    reportError(error): Observable <{}> {
        let data = {
            errorMessage: error.message,
            stackTrace: error.stack
        };
        //URL of the Express Server
        return this.http.post <{}>('http://localhost:8000/api/errors/angular', data );
    }
  }