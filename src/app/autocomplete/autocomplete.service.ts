import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?';
const apikey = '9wqKZmUsdnh5mCe0EVKyiSGctGUYVyAP';


@Injectable({
    providedIn: 'root'
  })


  export class autocompleteService {

    constructor(private http: HttpClient){
    }

    getCity(city:string): Observable<any>{
        return this.http.get<any>(`${baseUrl}apikey=${apikey}&q=${city}`)
    }
  }
