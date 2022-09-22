import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    NgbTypeaheadModule,
  ]
})
export class PagesModule { }
