import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataModel } from '../models/models';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  private BASE_URL = 'http://data.fixer.io/api/'

  getAllData(param): Observable<DataModel>{
    return this.http.get<DataModel>(`${this.BASE_URL}${param.date}?access_key=7b73f20314c84c42e9a4caf56b347a37&symbols=${param.symbols}&format=1`);
  }
}



//http://data.fixer.io/api/2013-03-16?access_key=7b73f20314c84c42e9a4caf56b347a37&symbols=USD,AUD,CAD&format=1