import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import { HeaderService } from './header.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router,
     private head: HeaderService
     ) { }
  color: ThemePalette = 'accent';
  isDark = false;
  isCels$ = new BehaviorSubject(false);
  isChecked:boolean;
  ngOnInit(): void {

    this.isDark = this.head.isDark;
    this.isChecked = this.head.isChecked;
    this.isCels$ = this.head.switchCels( this.isChecked );
  }

goToFav(){
  this.route.navigate(['favorites']);
}

goToMain(){
  this.route.navigate(['']);
}


switch(mode) {
  this.isDark = this.head.switchMode(mode.checked);
}

switchDegree(mode) {
this.isCels$ = this.head.switchCels(mode.checked);
}


}
