import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';

import { MaterialModule } from "./material/material.module";
import { CreatePostComponent } from './post/create-post/create-post.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';

import { environment } from "src/environments/environment";

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth, AuthModule as AngularFireAuthModule } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { ReactiveFormsModule } from "@angular/forms";
import { AlertComponent } from './shared/alert/alert.component';
import { MainComponent } from './layout/main/main.component';
import { BootstrapModule } from "./bootstrap/bootstrap.module";
import { PostListComponent } from './post/post-list/post-list.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { CapitilizePipe } from './pipes/capitilize.pipe';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FooterComponent } from './layout/footer/footer.component';
import { SearchPostsComponent } from './post/search-posts/search-posts.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreatePostComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AlertComponent,
    MainComponent,
    PostListComponent,
    ConfirmDialogComponent,
    CapitilizePipe,
    EditPostComponent,
    FormatDatePipe,
    FooterComponent,
    SearchPostsComponent,
    BreadcrumbsComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    AngularFireAuthModule,
    BootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
