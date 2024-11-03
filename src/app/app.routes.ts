import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotfountComponent } from './notfount/notfount.component';

export const routes: Routes = [

    { path: 'home', component: HomeComponent},
    
    { path: 'login', component: LoginComponent},

    { path: 'user-profile', component: UserProfileComponent},
    
    { path: 'notFount404', component: NotfountComponent},
    
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: '**', redirectTo: 'login' },

    
];
