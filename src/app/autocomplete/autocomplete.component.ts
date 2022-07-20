import { Component, OnInit } from '@angular/core';
import { AutocompleteService } from './autocomplete.service';
import { map,debounceTime } from "rxjs/operators";
import { CityListItem } from '../core/city-list-item';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  options: CityListItem[] = [];
  currValue: string;
  constructor(private cityList: AutocompleteService) {   }

  ngOnInit(): void {
    if(!this.cityList.isInit)
      this.cityList.getciiesInit();
      this.cityList.isInit = true;
  }
  
  getData(str:string) {
    this.options=[];
    if(str.length > 0) {
      this.cityList.getCity(str)
      .pipe(debounceTime(1000))
      .subscribe((res) => {
          res.forEach(element => {
            this.options.push(new CityListItem(element.Key,element.LocalizedName));
          });
      });
    }
    
  }

  getCityService(id:number,name:string){
    this.cityList.getciies(id,name);

  }



}
