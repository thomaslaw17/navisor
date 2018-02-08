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
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'customerService',
    component: CustomerServiceComponent
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
    path: 'reward',
    component: RewardComponent
  },
  {
    path: 'tripPlanning',
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
