import { Routes } from '@angular/router';
import { LoginComponent } from './business/login/login.component';
import { HomeComponent } from './business/home/home.component';
import { UserProfileComponent } from './business/user-profile/user-profile.component';
import { NotfountComponent } from './shared/components/notfount/notfount.component';
import { RegisterComponent } from './business/register/register.component';
import { ServicesComponent } from './business/services/services.component';
import { AboutComponent } from './business/about/about.component';
import { CreateServiceComponent } from './business/create-service/create-service.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'services/new',
    component: CreateServiceComponent,
    canActivate: [authGuard],
  },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent, canActivate: [authGuard] },
  { path: 'notFount404', component: NotfountComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'notFount404' },
];
