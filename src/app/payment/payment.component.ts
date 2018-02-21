import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../auth.service';
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
    private angularFireDatanase: AngularFireDatabase
  ) {}

  ngOnInit() {}
}
