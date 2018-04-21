import { CalendarUtilModule } from './calendar-util/calendar-util.module';
import { CalendarModule } from 'angular-calendar';
import { MaterialModule } from './material/material.module';
import { AttractionService } from './services/attraction.service';
import { TripService } from './services/trip.service';
import { CareerComponent } from './career/career.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import {
  SearchComponent,
  SearchResultComponent
} from './search/search.component';
import {
  ProfileComponent,
  ProfileEditComponent,
  ProfilePastEventComponent,
  ProfilePaymentMethodComponent,
  ProfileRewardPointsComponent,
  ProfileScheduleComponent,
  ProfileEventComponent,
  ProfileLanguageComponent
} from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; // for router-outlet element in html
import { TripPlanningComponent } from './trip-planning/trip-planning.component';
import { PaymentComponent } from './payment/payment.component';
import { RewardComponent } from './reward/reward.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import {
  MessagingComponent,
  MessageComponent,
  MessagingChatComponent,
  MessagingChatItemComponent
} from './messaging/messaging.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './services/auth.service';
import { NavBarService } from './services/nav-bar.service';
import { AppGlobal } from './app.global';

import Popper from 'popper.js';
import bootstrap from 'bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickModule } from 'ngx-slick';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import {
  SearchDetailComponent,
  SearchEventItemComponent
} from './search-detail/search-detail.component';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import {
  CustomTripComponent,
  CustomEventComponent
} from './custom-trip/custom-trip.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotUserNameComponent } from './forgot-user-name/forgot-user-name.component';
import { TripCategoryComponent } from './trip-category/trip-category.component';
import { UtilService } from './services/util.service';
import { FeatureTripComponent } from './feature-trip/feature-trip.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AssistantComponent } from './assistant/assistant.component';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgxCarouselModule,
    SlickModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CalendarModule.forRoot(),
    CalendarUtilModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SearchComponent,
    SearchResultComponent,
    ProfileComponent,
    ProfileEditComponent,
    ProfilePastEventComponent,
    ProfilePaymentMethodComponent,
    ProfileRewardPointsComponent,
    ProfileScheduleComponent,
    ProfileEventComponent,
    ProfileLanguageComponent,
    TripPlanningComponent,
    PaymentComponent,
    RewardComponent,
    CustomerServiceComponent,
    MessagingComponent,
    MessagingChatItemComponent,
    MessagingChatComponent,
    MessageComponent,
    EditProfileComponent,
    CalendarComponent,
    NotFoundComponent,
    CareerComponent,
    RegisterComponent,
    SearchDetailComponent,
    SearchEventItemComponent,
    BookingConfirmComponent,
    CustomTripComponent,
    CustomEventComponent,
    ForgotPasswordComponent,
    ForgotUserNameComponent,
    TripCategoryComponent,
    FeatureTripComponent,
    NavBarComponent,
    FooterComponent,
    AssistantComponent
  ],
  providers: [
    AngularFireAuth,
    AuthService,
    TripService,
    AttractionService,
    NavBarService,
    UtilService,
    AppGlobal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
