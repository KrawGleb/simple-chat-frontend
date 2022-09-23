import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { LocalStorageConstants } from '../../constants/local-storage.constants';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';
import { UsersService } from '../../services/users.service';
import { MessagesService } from '../../services/messages.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent implements OnInit {
  public userNames: string[] = [];
  public formGroup = new FormGroup({
    recipient: new FormControl('', [
      Validators.required,
      this.getRecipientValidator(),
    ]),
    theme: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<MessageDialogComponent>,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
    private readonly toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.usersService
      .getAllUsers()
      .pipe(
        tap((users: User[]) => {
          this.userNames = users.map((u) => u.name);
        })
      )
      .subscribe();
  }

  public cancelClick() {
    this.dialogRef.close();
  }

  public sendClick() {
    const message = {
      from: {
        name: localStorage.getItem(LocalStorageConstants.UserName),
      } as User,
      to: {
        name: this.formGroup.get('recipient')?.value,
      } as User,
      theme: this.formGroup.get('theme')?.value,
      content: this.formGroup.get('content')?.value,
    } as Message;

    this.messagesService
      .sendMessage(message)
      .pipe(
        tap(() => {
          this.toastr.success('', 'Message send!');
          this.dialogRef.close();
        })
      )
      .subscribe();
  }

  public hasError(controlName: string, errorName: string) {
    return this.formGroup.get(controlName)?.hasError(errorName);
  }

  public getRecipientValidator() {
    return (recipientControl: AbstractControl) => {
      if (!recipientControl.value) {
        return null;
      }

      return this.userNames.indexOf(recipientControl.value) > -1
        ? null
        : { unknownUser: true };
    };
  }

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.userNames
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );
}
