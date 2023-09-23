import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [
    CommonModule,
    NgbNavModule
  ]
})
export class BootstrapModule { }
