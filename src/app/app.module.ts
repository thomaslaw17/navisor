import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from './../environments/environment';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; // for router-outlet element in html
import { TripPlanningComponent } from './trip-planning/trip-planning.component';
import { PaymentComponent } from './payment/payment.component';
import { RewardComponent } from './reward/reward.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { MessagingComponent } from './messaging/messaging.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    SearchComponent,
    ProfileComponent,
    TripPlanningComponent,
    PaymentComponent,
    RewardComponent,
    CustomerServiceComponent,
    MessagingComponent,
    EditProfileComponent,
    CalendarComponent,
    NotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'navisor'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {}
