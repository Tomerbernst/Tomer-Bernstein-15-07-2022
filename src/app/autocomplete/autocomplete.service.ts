import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CityWeather } from "../core/city-weather";
import { Store } from "@ngrx/store";
import * as CityListAction from "./autocomplete.action";

const apikey = "aGe45AdC82u8Ywd05kqhMKWePmZlJR4Z";

const baseUrlCurrentityStr =
  "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?";
const baseUrlCurrentCityID =
  "http://dataservice.accuweather.com/currentconditions/v1/";
const baseUrlFiveDays =
  "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
const baseUrlCurrentLocation =
  "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";

@Injectable({
  providedIn: "root",
})
export class AutocompleteService {
  isInit: boolean = false;

  constructor(
    private http: HttpClient,
    private store: Store<{
      cityMap: { cities: CityWeather[]; favCity: CityWeather[] };
    }>
  ) {}

  getCityByString(city: string): Observable<any> {
    return this.http.get<any>(
      `${baseUrlCurrentityStr}apikey=${apikey}&q=${city}`
    );
  }

  getCityById(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrlCurrentCityID}${id}?apikey=${apikey}`);
  }

  getFiveDaysWeather(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrlFiveDays}${id}?apikey=${apikey}`);
  }
  getCityByCoord(lat: number, long: number): Observable<any> {
    return this.http.get<any>(
      `${baseUrlCurrentLocation}?apikey=${apikey}&q=${lat},${long}`
    );
  }

  setCities(id: number, name: string) {
    this.getCurrentDay(id).subscribe((res) => {
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
      );
    });
    this.getFiveDays(id).subscribe((res) => {
      for (let i = 0; i < res.DailyForecasts.length; i++) {
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
        );
      }
    });
  }

  getCurrentDay(id: number) {
    return this.getCityById(id);
  }

  getFiveDays(id: number) {
    return this.getFiveDaysWeather(id);
  }

  initCities() {
    let long, lat, id, name, weatherIcon, temperature, key;
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      this.getCityByCoord(lat, long).subscribe((x) => {
        this.setCities(x.ParentCity.Key, x.AdministrativeArea.LocalizedName);
      });
    });
  }
}
