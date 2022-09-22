import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageCardComponent } from './components/message-card/message-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';

@NgModule({
  declarations: [
    MessageCardComponent,
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    MessageCardComponent,
    MessageDialogComponent
  ]
})
export class AppCommonModule { }
