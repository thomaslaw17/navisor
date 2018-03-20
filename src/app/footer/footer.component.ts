import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  gotoHome() {
    this.router.navigate(['']);
  }

  gotoAbout() {
    this.router.navigate(['#aboutUs']);
  }

  gotoTripPlanning() {
    this.router.navigate(['tripPlanning']);
  }

  gotoPartnership() {
    this.router.navigate(['#partnership']);
  }

  gotoCareer() {
    this.router.navigate(['career']);
  }

  gotoContactUs() {
    this.router.navigate(['#contactUs']);
  }
}
