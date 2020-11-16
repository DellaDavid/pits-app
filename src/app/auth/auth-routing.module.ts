
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth.component';


const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: 'register', component: RegisterComponent },
    { path: 'profile-create', component: ProfileComponent },
    { path: 'user', component: UserComponent }

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
