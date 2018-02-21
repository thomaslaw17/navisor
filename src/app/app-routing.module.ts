import { CalendarComponent } from './calendar/calendar.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
    path: 'login',
    component: LoginComponent
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
    path: 'reward',
    component: RewardComponent
  },
  {
    path: 'tripPlanning/:tripId',
    component: TripPlanningComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
