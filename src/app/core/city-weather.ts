export class CityWeather {

    id: number;
    name: string;
    weatherIcon: number;
    temperature:number;
    isFav:boolean;

    constructor(id:number, name:string, weatherIcon:number, temperature:number,isFav :boolean){
        this.id = id;
        this.name = name;
        this.weatherIcon = weatherIcon;
        this.temperature = temperature;
        this.isFav = isFav;
    }

}