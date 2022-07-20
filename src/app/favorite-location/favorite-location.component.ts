import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AutocompleteService } from '../autocomplete/autocomplete.service';
import { CityWeather } from '../core/city-weather';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-favorite-location',
  templateUrl: './favorite-location.component.html',
  styleUrls: ['./favorite-location.component.scss']
})
export class FavoriteLocationComponent implements OnInit {
  favArr:Observable<{ favArr: CityWeather[] }>;
  isCels$ = new Subject<boolean>();

  constructor(private store: Store<{ cityMap: { favArr: CityWeather[] }}>,
    private head:HeaderService,
    private autoService: AutocompleteService, private route:Router ) { }

  ngOnInit(): void {
    this.favArr = this.store.select("cityMap");
    this.isCels$ = this.head.isCels$;

  }

  goBack(id:number, name:string){
    console.group(id,name)
    this.autoService.getciies(id,name);
    this.route.navigate(['']);


  }

}
