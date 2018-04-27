import { Trip } from './../../model/Trip';
import { AppGlobal } from './../app.global';
import { NavBarService } from './../services/nav-bar.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public tripId: string;
  public trip: Trip;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private navBarService: NavBarService,
    private appGlobal: AppGlobal
  ) {
    this.navBarService.hideNavBar();
  }
  selectCreditCard() {
    if (
      !document
        .getElementById('creditCardLabel')
        .classList.contains('blue-border')
    ) {
      document.getElementById('creditCardLabel').classList.add('blue-border');
      document.getElementById('payPalLabel').classList.remove('blue-border');
    }
  }
  selectPayPal() {
    if (
      !document.getElementById('payPalLabel').classList.contains('blue-border')
    ) {
      document.getElementById('payPalLabel').classList.add('blue-border');
      document
        .getElementById('creditCardLabel')
        .classList.remove('blue-border');
    }
  }

  gotoPaypal() {
    this.router.navigate(['paypal']);
  }
  ngOnInit() {
    this.trip = new Trip();
    this.activatedRoute.params.subscribe(param => {
      this.tripId = param.tripId;
      this.angularFireDatabase
        .object<Trip>('Trip/' + param.tripId)
        .valueChanges()
        .subscribe(trip => {
          this.trip = trip;
        });
    });
    this.navBarService.hideNavBar();
  }
}
