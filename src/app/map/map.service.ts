import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class MapService {
  constructor(private http: Http) {
   }
  search(location, categoryId): Observable<any> {
    var categoriesUrl = `${environment.API_ENDPOINT}/bussiness?categoryId=${categoryId}&location=${location}`;
    console.log(categoriesUrl)
       return this.http.get(categoriesUrl)
         .map((response: Response) => response.json());
    }
}
