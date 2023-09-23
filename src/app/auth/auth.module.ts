import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { authReducer } from "./ngrx/reducers/auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./ngrx/effects/auth.effect";
import { SnackBarEffects } from "./ngrx/effects/snackbar.effect";

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forRoot([AuthEffects, SnackBarEffects])
  ]
})
export class AuthModule { }
