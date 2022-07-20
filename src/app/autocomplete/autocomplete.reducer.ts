import { Action } from "@ngrx/store";
import * as CityListAction from "../autocomplete/autocomplete.action";
import { CityWeather } from "../core/city-weather";

const initialState = {
  cities: [],
  favArr:[],
};

export function autocompleteReducer(
  state = initialState,
  action: CityListAction.CityListAction
) {
  console.log(action.type);

  switch (action.type) {
    case CityListAction.ADD_CITY:

      if(state.cities.length < 6 ){
        return  {
          ...state,
          cities: [...state.cities, action.payload]
        };  
      } else {
        return {
          ...state,
          cities: [action.payload]
          };
      }


      case CityListAction.ADD_CARD:
        console.log('hello');
        let isExist: Boolean;
        isExist = state.favArr.some(p=> p.id == action.payload.id );
        console.log({
          ...state,
          favArr: [...state.favArr, action.payload]
        });
        
        if (!isExist)
        return {
        ...state,
        favArr: [...state.favArr, action.payload]
      }; else
          return state;

      
      case CityListAction.DELETE_CARD:   
        let lastState = state.favArr.filter((city) => {
          return !(city.id == action.payload);
          });

        return {
          ...state,
          favArr:[
            ...state.favArr.filter((city) => {
            return !(city.id == action.payload);
            }
          )]
        };
    
    default: {
      return state;
    }
  }
}
