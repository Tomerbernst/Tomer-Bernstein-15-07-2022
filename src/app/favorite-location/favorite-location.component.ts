import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { AutocompleteService } from "../autocomplete/autocomplete.service";
import { CityWeather } from "../core/city-weather";
import { HeaderService } from "../header/header.service";

@Component({
  selector: "app-favorite-location",
  templateUrl: "./favorite-location.component.html",
  styleUrls: ["./favorite-location.component.scss"],
})
export class FavoriteLocationComponent implements OnInit {
  favCity: Observable<{ favCity: CityWeather[] }>;
  isCels$ = new Subject<boolean>();

  constructor(
    private store: Store<{ cityMap: { favCity: CityWeather[] } }>,
    private headerService: HeaderService,
    private acService: AutocompleteService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.favCity = this.store.select("cityMap");
    this.isCels$ = this.headerService.isCels$;
  }

  navToMainScreen(id: number, name: string) {
    this.acService.setCities(id, name);
    this.route.navigate([""]);
  }
}
