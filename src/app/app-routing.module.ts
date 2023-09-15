import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePostComponent } from "./post/create-post/create-post.component";
import { LoginComponent } from "./auth/login/login.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { RegisterComponent } from "./auth/register/register.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'add-post', component: CreatePostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
