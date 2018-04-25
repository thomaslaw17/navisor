import { NavBarService } from './../services/nav-bar.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private navBarService: NavBarService
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
    this.navBarService.hideNavBar();
  }
}
