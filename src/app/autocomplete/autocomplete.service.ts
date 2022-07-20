import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityWeather } from '../core/city-weather';
import { Store } from "@ngrx/store";
import * as CityListAction from "./autocomplete.action";


const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?';
const apikey = '9wqKZmUsdnh5mCe0EVKyiSGctGUYVyAP';
const baseUrl2='http://dataservice.accuweather.com/currentconditions/v1/';
const baseUrl3='http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
const baseUrl4='http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';


@Injectable({
    providedIn: 'root'
  })


  export class AutocompleteService {
    isInit: boolean = false;

    constructor(
      private http: HttpClient,  
      private store: Store<{ cityMap: { cities: CityWeather[],favArr: CityWeather[] } }>){
      
    }

    getCity(city:string): Observable<any>{
        return this.http.get<any>(`${baseUrl}apikey=${apikey}&q=${city}`);
    }

    getCityData(id:number): Observable<any>{
        return this.http.get<any>(`${baseUrl2}${id}?apikey=${apikey}`);
    }

    getFiveDaysWeather(id:number): Observable<any>{
      return this.http.get<any>(`${baseUrl3}${id}?apikey=${apikey}`);
  }
     getCityByCoord(lat:number,long :number): Observable<any>{
      return this.http.get<any>(`${baseUrl4}?apikey=${apikey}&q=${lat},${long}`);
  }



    getciies(id:number,name:string) {
      this.getCityData(id)
      .subscribe((res) => {
        this.store.dispatch(
        new CityListAction.AddCity(
          new CityWeather(
            id,
            name,
            res[0].WeatherIcon,
            Math.round(res[0].Temperature.Imperial.Value),
            false
            )
          )
        )
    });

    this.getFiveDaysWeather(id)
    .subscribe((res)=>{
      for(let i = 0; i < res.DailyForecasts.length; i++){
        this.store.dispatch(
          new CityListAction.AddCity(
            new CityWeather(
              id,
              name,
              res.DailyForecasts[i].Day.Icon,
              Math.round(res.DailyForecasts[i].Temperature.Maximum.Value),
              false
              )
            )
        )
      }
    });
  }

  getciiesInit() {    
    let long,lat,id,name,weatherIcon,temperature,key;
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude
      this.getCityByCoord(lat,long).subscribe((x)=>{
        this.getciies(x.ParentCity.Key,x.AdministrativeArea.LocalizedName);

      }
        )




    });
  }


   


}
