import { NavBarService } from './../nav-bar.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppGlobal } from '../app.global';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css']
})
export class SearchDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private navBarService: NavBarService,
    public appGlobal: AppGlobal
  ) {}

  confirm: boolean;

  bookNow() {
    this.confirm = true;
  }

  backToDetail() {
    this.confirm = false;
  }

  backToSearch() {
    this.router.navigate(['search']);
  }
  ngOnInit() {
    this.navBarService.showNavbar();
    this.confirm = false;
  }
}
