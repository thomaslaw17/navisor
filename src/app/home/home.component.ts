import { Place } from './../../model/Place';
import { NavBarService } from './../nav-bar.service';
import { AppGlobal } from './../app.global';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
import { Trip } from '../../model/Trip';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('trigger', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(
          ':enter',
          stagger('300ms', [
            animate(
              '.6s ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(35px)',
                  offset: 0.3
                }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  public themes: Array<string>;
  public budgets: Array<string>;
  public numberOfTravellers: Array<string>;

  public contact: {
    name: string;
    email: string;
    subject: string;
    msg: string;
  };

  public suggestTrips: Array<{
    tripId: string;
    name: string;
    photoUrl: string;
    description: string;
  }>;

  public suggestNavigator: Array<{
    name: string;
    description: string;
    pic: string;
  }>;

  public Config: NgxCarousel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public appGlobal: AppGlobal,
    private navBarService: NavBarService
  ) {
    this.Config = {
      grid: { xs: 2, sm: 2, md: 2, lg: 2, all: 0 },
      slide: 2,
      speed: 400,
      point: {
        visible: true
      },
      loop: false,
      touch: true
    };
  }

  afterChange() {
    console.log('afterChange');
  }

  videoControl(event) {
    //   document.getElementById('homeVideo').play();
  }

  gotoTripDetail(tripId) {
    this.router.navigate(['searchDetail/' + tripId]);
  }

  search() {
    let filled = false;
    // let alerted = false;
    const today = new Date();
    if (
      this.appGlobal.search.location !== undefined &&
      this.appGlobal.search.location !== null &&
      this.appGlobal.search.location !== ''
    ) {
      filled = true;
    }
    if (
      this.appGlobal.search.startDate !== undefined &&
      this.appGlobal.search.startDate !== null
    ) {
      filled = true;
    }
    if (
      this.appGlobal.search.theme !== undefined &&
      this.appGlobal.search.theme !== null &&
      this.appGlobal.search.theme !== ''
    ) {
      filled = true;
    }
    if (
      this.appGlobal.search.budget !== undefined &&
      this.appGlobal.search.budget !== null
    ) {
      filled = true;
      // if (this.appGlobal.search.budget == 0 && !alerted) {
      //   alert('Budget below zero');
      // }
    }
    if (
      this.appGlobal.search.numberOfTravellers !== undefined &&
      this.appGlobal.search.numberOfTravellers !== null &&
      this.appGlobal.search.numberOfTravellers !== 0
    ) {
      filled = true;
    }
    if (
      this.appGlobal.search.nameOfNavigator !== undefined &&
      this.appGlobal.search.nameOfNavigator !== null &&
      this.appGlobal.search.nameOfNavigator !== ''
    ) {
      filled = true;
    }
    if (!filled) {
      alert('Please enter valid arguement for search');
    } else {
      this.router.navigate(['search']);
    }
  }

  sendContactMessage() {
    let filled = false;
    if (
      this.contact.name !== undefined &&
      this.contact.name !== null &&
      this.contact.name !== ''
    ) {
      filled = true;
    }
    if (
      this.contact.email !== undefined &&
      this.contact.email !== null &&
      this.contact.email !== ''
    ) {
      filled = true;
    }
    if (
      this.contact.subject !== undefined &&
      this.contact.subject !== null &&
      this.contact.subject !== ''
    ) {
      filled = true;
    }
    if (
      this.contact.msg !== undefined &&
      this.contact.msg !== null &&
      this.contact.msg !== ''
    ) {
      filled = true;
    }

    if (filled) {
      // sendEmail();
    } else {
      alert(
        'Please fill in the form to contact us or you can email us at contactus@navisor.com'
      );
    }
  }

  gotoCareer() {
    this.router.navigate(['career']);
  }

  ngOnInit() {
    this.navBarService.showNavbar();
    this.themes = [
      'Theme',
      'Cultural & Heritage',
      'Nature',
      'Foodie',
      'Photography',
      'University Tour',
      'Others'
    ];

    this.budgets = [
      'Budget',
      '$500-$1000',
      '$1001-$1500',
      '$1501-$2000',
      '$2000+'
    ];

    this.numberOfTravellers = [
      'Number of travellers',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10'
    ];
    if (
      this.appGlobal.search.theme === undefined ||
      this.appGlobal.search.theme === null
    ) {
      this.appGlobal.search.theme = 'Theme';
    }
    if (
      this.appGlobal.search.location === undefined ||
      this.appGlobal.search.location === null
    ) {
      this.appGlobal.search.location = 'Location';
    }
    if (
      this.appGlobal.search.budget === undefined ||
      this.appGlobal.search.budget === null
    ) {
      this.appGlobal.search.budget = 'Budget';
    }

    this.contact = {
      name: '',
      email: '',
      subject: '',
      msg: ''
    };

    const firebasePrefix =
      'https://firebasestorage.googleapis.com/v0/b/navisor-b9b70.appspot.com/';

    this.suggestTrips = [
      {
        tripId: 'tripId',
        name: 'Night view from the peak',
        photoUrl:
          firebasePrefix +
          'o/home%2Fimg%2Fimg-01.jpg?alt=media&token=86b77455-9052-48e4-be25-98d870fd612f',
        description: 'Here is the peak.'
      },
      {
        tripId: '2',
        name: 'Boat ride in the victoria habour',
        photoUrl:
          firebasePrefix +
          'o/home%2Fimg%2Fimg-02.jpg?alt=media&token=622bc5c4-adb7-41a2-adb1-13afcb1b0668',
        description: 'Boat trip.'
      },
      {
        tripId: '3',
        name: "St. John's Cathedral",
        photoUrl:
          firebasePrefix +
          'o/home%2Fimg%2Fimg-03.jpg?alt=media&token=0459d797-8ac4-47b0-be1d-0c5f41086a89',
        description: 'One of the oldest church in Hong Kong '
      },
      {
        tripId: '4',
        name: "Mong Kok Ladies' Market",
        photoUrl:
          firebasePrefix +
          'o/home%2Fimg%2Fimg-04.jpg?alt=media&token=93e9653d-425f-4a00-b23e-f2a60a6a22fd',
        description: 'You can do shopping here!'
      },
      {
        tripId: '5',
        name: 'Lai Chi Wo Village',
        photoUrl:
          firebasePrefix +
          'o/home%2Fimg%2Fimg-05.jpg?alt=media&token=66600295-fbca-4646-8941-7796545ffcc4',

        description: 'The village resides next to a geopark'
      },
      {
        tripId: '6',
        name: 'Graffiti on Graham Street',
        photoUrl:
          firebasePrefix +
          'o/home%2Fimg%2Fimg-06.jpg?alt=media&token=97261f4d-73e4-4fc2-b7f7-f49daef99d12',
        description: 'This is a nice place to take photos'
      }
    ];

    this.suggestNavigator = [
      {
        name: 'Amy',
        description: 'HKU BBA(IS) Year 4',
        pic:
          firebasePrefix +
          'o/home%2Fimg%2Fnavigator%2Famy.png?alt=media&token=2adde141-99ad-4f17-ba01-ab026589bd6d'
      },
      {
        name: 'Ann',
        description: 'HKU BBA(IS) Year 4',
        pic:
          firebasePrefix +
          'o/home%2Fimg%2Fnavigator%2Fann.jpg?alt=media&token=716cae0c-8250-422c-9d10-9c583cf1a567'
      },
      {
        name: 'Hong',
        description: 'HKU BBA(IS) Year 4',
        pic:
          firebasePrefix +
          'o/home%2Fimg%2Fnavigator%2Fhong.jpg?alt=media&token=dae3690b-b2df-4ac2-8ae8-659f634daab9'
      }
    ];
  }
}
