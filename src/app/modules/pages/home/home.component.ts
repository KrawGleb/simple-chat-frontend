import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { dropDownAnimation } from '../../common/animations/drop-down.animation';
import { MessageDialogComponent } from '../../common/components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public isOpen = false;

  constructor(private readonly dialog: MatDialog) { }

  public openWriteMailDialog() {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '35%',
      data: {}
    })
  }
}
