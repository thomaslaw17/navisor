import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppGlobal } from '../app.global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private router: Router, private appGlobal: AppGlobal) {}

  ngOnInit() {}

  gotoHome() {
    this.router.navigate(['']);
  }

  gotoAbout() {
    this.router.navigate(['home/aboutUs']);
  }

  gotoTripPlanning(section) {
    this.appGlobal.searchFilter.themeFilter.culturalheritage = false;
    this.appGlobal.searchFilter.themeFilter.nature = false;
    this.appGlobal.searchFilter.themeFilter.foodie = false;
    this.appGlobal.searchFilter.themeFilter.photography = false;
    this.appGlobal.searchFilter.themeFilter.university = false;
    this.appGlobal.searchFilter.themeFilter.others = false;

    switch (section) {
      case 'Culture & Heritage':
        this.appGlobal.searchFilter.themeFilter.culturalheritage = true;
        break;
      case 'Nature':
        this.appGlobal.searchFilter.themeFilter.nature = true;
        break;
      case 'Foodie':
        this.appGlobal.searchFilter.themeFilter.foodie = true;
        break;
      case 'Photography':
        this.appGlobal.searchFilter.themeFilter.photography = true;
        break;
      case 'University':
        this.appGlobal.searchFilter.themeFilter.university = true;
        break;
      default:
        break;
    }

    this.router.navigate(['search']);
  }

  gotoPartnership() {
    this.router.navigate(['home/partnership']);
  }

  gotoCareer() {
    this.router.navigate(['career']);
  }

  gotoContactUs() {
    this.router.navigate(['home/contactUs']);
  }
}
