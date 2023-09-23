import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';

import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { MaterialModule } from "./modules/material.module";
import { CreatePostComponent } from './post/create-post/create-post.component';

import { environment } from "src/environments/environment";

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AuthModule as AngularFireAuthModule, getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from "./auth/auth.module";
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';
import { BootstrapModule } from "./modules/bootstrap.module";
import { showSnackbar } from './auth/ngrx/actions/snackbar.action';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { PostCardComponent } from './post/post-card/post-card.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { SearchPostsComponent } from './post/search-posts/search-posts.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { BreadcrumbsComponent } from './shared/components/breadcrumbs/breadcrumbs.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { FileInputComponent } from './shared/components/file-input/file-input.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { CapitilizePipe } from './shared/pipes/capitilize.pipe';
import { FileRenderPipe } from './shared/pipes/file-render.pipe';
import { FormatDatePipe } from './shared/pipes/format-date.pipe';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    SpinnerComponent,
    PostCardComponent,
    FileInputComponent,
    FileRenderPipe,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // DB
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    AngularFireAuthModule,
    // UI
    BootstrapModule,
    MaterialModule,
    // NGRX
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forRoot({ showSnackbar: showSnackbar }, {}),
    // EffectsModule.forRoot([]),
    AuthModule,
  ],
  providers: [
    FileRenderPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
