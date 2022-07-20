import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AutocompleteService } from '../autocomplete/autocomplete.service';
import { CityWeather } from '../core/city-weather';
import { AddToFavService } from './add-to-favorites/add-to-favorites.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {
  cities: Observable<{ cities: CityWeather[], favArr:CityWeather[] }>;

  constructor(
    private favService: AddToFavService,
    private cityList: AutocompleteService, 
    private store: Store<{ cityMap: { cities: CityWeather[], favArr:CityWeather[]} }> ) { }

  ngOnInit(): void {
    console.log('weather');
    this.cities = this.store.select("cityMap");
  }



}
