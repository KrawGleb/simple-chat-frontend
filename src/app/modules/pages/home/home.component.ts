import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { dropDownAnimation } from '../../common/animations/drop-down.animation';
import { MessageDialogComponent } from '../../common/components/message-dialog/message-dialog.component';
import { LocalStorageConstants } from '../../common/constants/local-storage.constants';
import { SignalRConstants } from '../../common/constants/signal-r.constants';
import { Message } from '../../common/models/message.model';
import { MessagesService } from '../../common/services/messages.service';
import { SignalRService } from '../../common/services/signal-r.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public isOpen = false;
  public messages: Message[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly messagesService: MessagesService,
    private readonly signalRService: SignalRService,
    private readonly toastr: ToastrService,
    private readonly router: Router
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

    this.signalRService.startConnection();
    this.signalRService.addListener(
      SignalRConstants.NewMessageSignal,
      (recipient: string) => {
        if (recipient == localStorage.getItem(LocalStorageConstants.UserName)) {
          this.toastr.warning('', 'New message!');
          this.messagesService
            .getAllUserMessages(
              localStorage.getItem(LocalStorageConstants.UserName)
            )
            .pipe(
              tap((messages) => {
                this.messages = messages;
              })
            )
            .subscribe();
        }
      }
    );
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

  public logout() {
    localStorage.removeItem(LocalStorageConstants.UserName);
    this.router.navigateByUrl('/login');
  }
}
