import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageCardComponent } from './components/message-card/message-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MessageCardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [
    MessageCardComponent
  ]
})
export class AppCommonModule { }
