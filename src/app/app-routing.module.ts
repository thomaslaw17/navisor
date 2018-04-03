import { AssistantComponent } from './assistant/assistant.component';
import { TripCategoryComponent } from './trip-category/trip-category.component';
import { ForgotUserNameComponent } from './forgot-user-name/forgot-user-name.component';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { CareerComponent } from './career/career.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RegisterComponent } from './register/register.component';
import { TripPlanningComponent } from './trip-planning/trip-planning.component';
import { RewardComponent } from './reward/reward.component';
import { PaymentComponent } from './payment/payment.component';
import { MessagingComponent } from './messaging/messaging.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomTripComponent } from './custom-trip/custom-trip.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/forgetPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'login/forgetUserName',
    component: ForgotUserNameComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'customerService',
    component: CustomerServiceComponent
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent
  },
  {
    path: 'career',
    component: CareerComponent
  },
  {
    path: 'messaging',
    component: MessagingComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reward',
    component: RewardComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'search/detail/:obj/:id',
    component: SearchDetailComponent
  },
  {
    path: 'confirmBooking',
    component: BookingConfirmComponent
  },
  {
    path: 'tripPlanning',
    component: TripPlanningComponent
  },
  {
    path: 'tripPlanning/:category',
    component: TripCategoryComponent
  },
  {
    path: 'customTrip/:tripId',
    component: CustomTripComponent
  },
  {
    path: 'assistant/:id',
    component: AssistantComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
