import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import { HeaderService } from "./header.service";
import { BehaviorSubject, Subject } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router, private headerService: HeaderService) {}
  color: ThemePalette = "accent";
  isDark = false;
  isCels$ = new BehaviorSubject(false);
  isChecked: boolean;
  ngOnInit(): void {
    this.isDark = this.headerService.isDark;
    this.isChecked = this.headerService.isChecked;
    this.isCels$ = this.headerService.switchFormat(this.isChecked);
  }

  goToFav() {
    this.route.navigate(["favorites"]);
  }

  goToMain() {
    this.route.navigate([""]);
  }

  switchLightMode(mode) {
    this.isDark = this.headerService.switchMode(mode.checked);
  }

  switchDegreeFormat(mode) {
    this.isCels$ = this.headerService.switchFormat(mode.checked);
  }
}
