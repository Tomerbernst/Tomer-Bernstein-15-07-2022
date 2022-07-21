import { Component, OnInit } from "@angular/core";
import { AutocompleteService } from "./autocomplete.service";
import { debounceTime } from "rxjs/operators";
import { CityListItem } from "../core/city-list-item";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"],
})
export class AutocompleteComponent implements OnInit {
  options: CityListItem[] = [];
  currValue: string;
  constructor(private acService: AutocompleteService) {}

  ngOnInit(): void {
    if (!this.acService.isInit) this.acService.initCities();
    this.acService.isInit = true;
  }

  getData(str: string) {
    this.options = [];
    if (str.length > 0) {
      this.acService
        .getCityByString(str)
        .pipe(debounceTime(1000))
        .subscribe((res) => {
          res.forEach((element) => {
            this.options.push(
              new CityListItem(element.Key, element.LocalizedName)
            );
          });
        });
    }
  }

  changeCity(id: number, name: string) {
    this.acService.setCities(id, name);
  }
}
