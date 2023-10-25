import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { RegisterComponent } from "./auth/register/register.component";
import { CreatePostComponent } from "./post/create-post/create-post.component";
import { EditPostComponent } from "./post/edit-post/edit-post.component";
import { PostDetailComponent } from "./post/post-detail/post-detail.component";
import { PostListComponent } from "./post/post-list/post-list.component";
import { SearchPostsComponent } from "./post/search-posts/search-posts.component";

const routes: Routes = [
  { path: '', component: PostListComponent, canActivate: [] },

  { path: 'add-post', component: CreatePostComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Add Post' } },
  { path: 'edit-post/:id', component: EditPostComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Edit Post' } },
  { path: 'post/:id', component: PostDetailComponent, canActivate: [AuthGuard], data: { breadcrumb: 'View Post' } },
  { path: 'post-list', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'search-posts', component: SearchPostsComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Search Posts' } },

  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
  { path: 'logout', component: LogoutComponent, data: { breadcrumb: 'Logout' } },
  { path: 'register', component: RegisterComponent, data: { breadcrumb: 'Register' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
