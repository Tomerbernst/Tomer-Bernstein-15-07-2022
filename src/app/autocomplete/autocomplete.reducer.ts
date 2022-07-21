import { Action } from "@ngrx/store";
import * as CityListAction from "../autocomplete/autocomplete.action";
import { CityWeather } from "../core/city-weather";

const initialState = {
  cities: [],
  favCity: [],
};

export function autocompleteReducer(
  state = initialState,
  action: CityListAction.CityListAction
) {
  switch (action.type) {
    case CityListAction.ADD_CITY:
      if (state.cities.length < 6) {
        return {
          ...state,
          cities: [...state.cities, action.payload],
        };
      } else {
        return {
          ...state,
          cities: [action.payload],
        };
      }

    case CityListAction.ADD_CARD:
      let isExist: Boolean;
      isExist = state.favCity.some((p) => p.id == action.payload.id);
      console.log({
        ...state,
        favCity: [...state.favCity, action.payload],
      });

      if (!isExist)
        return {
          ...state,
          favCity: [...state.favCity, action.payload],
        };
      else return state;

    case CityListAction.DELETE_CARD:
      let lastState = state.favCity.filter((city) => {
        return !(city.id == action.payload);
      });

      return {
        ...state,
        favCity: [
          ...state.favCity.filter((city) => {
            return !(city.id == action.payload);
          }),
        ],
      };

    default: {
      return state;
    }
  }
}
