import { Routes } from '@angular/router';
import { LoginComponent } from './business/login/login.component';
import { HomeComponent } from './business/home/home.component';
import { UserProfileComponent } from './business/user-profile/user-profile.component';
import { NotfountComponent } from './shared/components/notfount/notfount.component';
import { RegisterComponent } from './business/register/register.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  { path: 'notFount404', component: NotfountComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'notFount404' },
];
