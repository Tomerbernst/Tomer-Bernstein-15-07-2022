import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { StoreModule } from '@ngrx/store';
import { autocompleteReducer } from '../app/autocomplete/autocomplete.reducer';
import { MatCardModule } from '@angular/material/card';
import { FavoriteLocationComponent } from './favorite-location/favorite-location.component';
import { RouterModule, Routes } from '@angular/router';
import { AddToFavoritesComponent } from './weather-details/add-to-favorites/add-to-favorites.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

const appRouts: Routes =[
  { path: '' ,component: WeatherDetailsComponent},
  { path: 'favorites', component: FavoriteLocationComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    HeaderComponent,
    WeatherDetailsComponent,
    FavoriteLocationComponent,
    AddToFavoritesComponent
  ],
  imports: [
    BrowserModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forRoot(
      {cityMap: autocompleteReducer}
      ),
    MatCardModule,
    RouterModule.forRoot(appRouts),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
