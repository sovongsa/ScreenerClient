import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class HomeService {
  constructor(private http: Http) {
  }

  getAllCategories(): Observable<any> {
    const categoriesUrl = `${environment.API_ENDPOINT_BLUEMIX}/categories`;
    return this.http.get(categoriesUrl)
      .map((response: Response) => <any>response.json());
  };
}
