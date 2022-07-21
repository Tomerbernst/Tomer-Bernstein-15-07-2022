import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CityWeather } from "../../core/city-weather";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AddToFavService {
  constructor(
    private store: Store<{
      cityMap: { cities: CityWeather[]; favCity: CityWeather[] };
    }>
  ) {}

  getFavState(
    favCity: Observable<{ cities: CityWeather[]; favCity: CityWeather[] }>
  ) {
    return favCity.pipe(
      map((data) => data.favCity.some((p) => p.id == data.cities[0].id))
    );
  }
}
