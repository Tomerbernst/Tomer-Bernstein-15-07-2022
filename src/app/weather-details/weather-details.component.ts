import { Component, Input, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AutocompleteService } from '../autocomplete/autocomplete.service';
import { CityWeather } from '../core/city-weather';
import { HeaderService } from '../header/header.service';
import { AddToFavService } from './add-to-favorites/add-to-favorites.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})

export class WeatherDetailsComponent implements OnInit {
  cities: Observable<{ cities: CityWeather[], favCity:CityWeather[] }>;
  isCels$ = new Subject<boolean>();

  constructor(
    private favService: AddToFavService,
    private head: HeaderService,
    private cityList: AutocompleteService, 
    private store: Store<{ cityMap: { cities: CityWeather[], favCity:CityWeather[]} }> ) { }

  ngOnInit(): void {
    this.cities = this.store.select("cityMap");
    this.isCels$ = this.head.isCels$;
  }



}
