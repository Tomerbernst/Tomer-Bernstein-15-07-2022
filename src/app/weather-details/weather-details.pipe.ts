import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "round", pure: false })
export class RoundTenPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value);
  }
}
