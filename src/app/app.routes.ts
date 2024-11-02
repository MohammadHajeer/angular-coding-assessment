import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import {
  DashboardComponent,
  ProductsComponent,
  ProfileComponent,
  TasksComponent,
  WeatherComponent,
} from './dashboard';
import { noAuthGuard } from './no-auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent, canActivate: [noAuthGuard] },
  {
    path: 'signup',
    component: SignupFormComponent,
    canActivate: [noAuthGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'weather', component: WeatherComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'products', component: ProductsComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
