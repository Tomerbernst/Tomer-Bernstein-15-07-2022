import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, first, map, startWith, take } from 'rxjs/operators';
import { CityWeather } from 'src/app/core/city-weather';
import * as CityListAction from "../../autocomplete/autocomplete.action";
import { AddToFavService } from './add-to-favorites.service';

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss']
})
export class AddToFavoritesComponent implements OnInit {

  favArr:Observable<{ cities: CityWeather[] , favArr: CityWeather[] }>;
  isInFavorite :boolean = false;


  constructor(
    private favService: AddToFavService,
    private store: Store<{ cityMap: { cities: CityWeather[],  favArr: CityWeather[] }}>
    ) {
     }

  ngOnInit(): void {
    this.favArr= this.store.select('cityMap');
    this.switchButtons();
  }

addToFav() {

 this.favArr
  .pipe(
    take(1),
    map((data) =>data.cities[0])
    )
  
  .subscribe((s)=>{
    this.store.dispatch(
      new CityListAction.AddCard(
        new CityWeather(
          s.id,
          s.name,
          s.weatherIcon,
          s.temperature,
          true
        )
      )
    )
  });
}


removefromFav() {

  this.favArr
  .pipe(
    take(1),
    map((data) =>data.cities[0].id)
    )
  .subscribe((s)=>{
    this.store.dispatch(
      new CityListAction.DeleteCard(s)
      )});

}
 


switchButtons() {
  this.favService.getFavState(this.favArr).subscribe(x=> this.isInFavorite = x);
}




}
