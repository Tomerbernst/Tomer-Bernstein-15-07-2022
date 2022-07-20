import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityWeather } from '../../core/city-weather';
import { Store } from "@ngrx/store";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })


  export class AddToFavService {

    constructor(
      private store: Store<{ cityMap: { cities: CityWeather[],favArr: CityWeather[] } }>){
    }

    getFavState( favArr:Observable<{ cities: CityWeather[] , favArr: CityWeather[] }>) {
       return favArr
        .pipe(map((data) =>data.favArr.some(
          p=> p.id == data.cities[0].id)));
      }
}
