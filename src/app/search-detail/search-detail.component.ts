import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css']
})
export class SearchDetailComponent implements OnInit {

  confirm: boolean;

  constructor(private router: Router, private authService: AuthService) { }

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
    this.confirm = false;
  }

}
