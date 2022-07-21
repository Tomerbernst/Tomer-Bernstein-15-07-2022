import { Action } from '@ngrx/store';
import { CityWeather } from '../core/city-weather';

export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const ADD_CITY = 'ADD_CITY';


export class AddCity implements Action {
    readonly type = ADD_CITY;
    constructor(public payload:CityWeather){}
}   

export class AddCard implements Action {
    readonly type = ADD_CARD;
    constructor(public payload:CityWeather){}
}   


export class DeleteCard implements Action {
    readonly type = DELETE_CARD;
    constructor(public payload:number){}
}   

export type CityListAction = AddCity | AddCard  | DeleteCard;


