import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Navisor';
  item: Observable<any>;
  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService,
    private router: Router
  ) {
    this.item = angularFireDatabase.object('item').valueChanges();
  }

  logout() {
    this.authService.logout().then(
      resolve => {
        this.router.navigate(['login']);
      },
      reject => {
        console.log('Logout Error', reject);
      }
    );
  }
}
