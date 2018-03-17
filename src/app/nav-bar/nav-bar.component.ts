import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() show: boolean;
  @Input() loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.authService.logout().then(
      resolve => {
        this.router.navigate(['']);
      },
      reject => {
        console.log('Logout Error', reject);
      }
    );
  }

  gotoLogin() {
    this.router.navigate(['login']);
  }

  gotoRegister() {
    this.router.navigate(['register']);
  }
}
