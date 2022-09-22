import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { LocalStorageConstants } from '../../common/constants/local-storage.constants';
import { User } from '../../common/models/user.model';
import { UsersService } from '../../common/services/users.service';

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District Of Columbia',
  'Federated States Of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Islands',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  private userNames: string[] = [];

  public formGroup = new FormGroup({
    userName: new FormControl()
  })

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().pipe(
      tap((users: User[]) => {
        this.userNames = users.map(u => u.name);
      })
    ).subscribe();
  }

  get userNameControl() {
    return this.formGroup.get('userName')
  }

  public submit() {
    if (this.userNameControl?.value) {
      this.usersService.loginUser(this.userNameControl.value).pipe(
        tap((user) => {
          if (user) {
            localStorage.setItem(LocalStorageConstants.UserName, user.name);
            this.router.navigateByUrl('/home');
          }
        })
      ).subscribe();
    }
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
