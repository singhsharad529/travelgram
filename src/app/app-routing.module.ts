import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

import { AngularFireAuthGuard,
redirectLoggedInTo,
redirectUnauthorizedTo
} from "@angular/fire/auth-guard";
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatComponent } from './pages/chat/chat.component';

const redirectUnauthorizedToLogin = ()=> redirectUnauthorizedTo(["signin"]);
const redirectLoggedInToHome = () => redirectLoggedInTo([""]);

const routes: Routes = [
  {
    path: 'signin',
    component:SigninComponent,
    canActivate:[AngularFireAuthGuard],
    data : {authGuardPipe:redirectLoggedInToHome}
  },
  {
    path: 'signup',
    component:SignupComponent,
    canActivate:[AngularFireAuthGuard],
    data : {authGuardPipe:redirectLoggedInToHome}
  },
  {
    path: 'addpost',
    component:AddpostComponent,
    canActivate:[AngularFireAuthGuard],
    data : {authGuardPipe:redirectUnauthorizedToLogin}
  },
  {
    path: '',
    component:HomeComponent,
    canActivate:[AngularFireAuthGuard],
    data : {authGuardPipe:redirectUnauthorizedToLogin}
  },
  {
    path:'chat',
    component:ChatComponent,
    canActivate:[AngularFireAuthGuard],
    data : {authGuardPipe:redirectUnauthorizedToLogin}

  },
  {
    path: 'profile',
    component:ProfileComponent,
    canActivate:[AngularFireAuthGuard],
    data : {authGuardPipe:redirectUnauthorizedToLogin}
  },
  {
    path: '**',
    component:PagenotfoundComponent,
     
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
