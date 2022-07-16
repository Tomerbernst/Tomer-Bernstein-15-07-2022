import { Component, OnInit } from '@angular/core';
import { autocompleteService } from './autocomplete.service';
import { map } from "rxjs/operators";
import { CityListItem } from '../core/city-list-item';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  options: CityListItem[] = [];
  inputVal: string;
  constructor(private cityList: autocompleteService) { }

  ngOnInit(): void {
  }
  
  getData() {
    this.options=[];
    console.log( this.inputVal);
      if(this.inputVal != '') {
      this.cityList.getCity(this.inputVal).subscribe((res) => {
          res.forEach(element => {
            this.options.push(new CityListItem(element.Key,element.LocalizedName));
          });
          console.log(this.options);
      });
    }
  }

}
