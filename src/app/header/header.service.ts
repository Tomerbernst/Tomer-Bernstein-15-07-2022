import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })


  export class HeaderService {
    isDark: boolean;
    isCels$ = new BehaviorSubject(false);
    isChecked:boolean;
    constructor(){}

   
    switchMode(isDark:boolean) {
        if (isDark) {
          document.querySelector('body').style.setProperty('--bg-color', '#707070');
          document.querySelector('body').style.setProperty('--text-color', '#f8fafb');
          this.isDark=true;
        } else {
          document.querySelector('body').style.setProperty('--bg-color', '#f8fafb');
          document.querySelector('body').style.setProperty('--text-color', '#272727');
          this.isDark = false;
        }
        return this.isDark;

      }

      switchCels(isCels:boolean) {
        if (isCels) {
            this.isCels$.next(true);
            this.isChecked=true;

        } else {
            this.isCels$.next(false);
            this.isChecked=false;
        }
        return this.isCels$

      }

      

}
