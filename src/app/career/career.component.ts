import { Router } from '@angular/router';
import { NavBarService } from './../services/nav-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
  constructor(private router: Router, private navBarService: NavBarService) {}

  ngOnInit() {
    this.navBarService.showNavbar();
  }
}
