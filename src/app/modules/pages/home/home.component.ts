import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { dropDownAnimation } from '../../common/animations/drop-down.animation';
import { MessageDialogComponent } from '../../common/components/message-dialog/message-dialog.component';
import { LocalStorageConstants } from '../../common/constants/local-storage.constants';
import { Message } from '../../common/models/message.model';
import { MessagesService } from '../../common/services/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isOpen = false;
  public messages: Message[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.messagesService
      .getAllUserMessages(localStorage.getItem(LocalStorageConstants.UserName))
      .pipe(
        tap((messages) => {
          this.messages = messages;
        })
      )
      .subscribe();
  }

  get userName() {
    return localStorage.getItem(LocalStorageConstants.UserName);
  }

  public openWriteMailDialog() {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '35%',
      data: {},
    });
  }
}
