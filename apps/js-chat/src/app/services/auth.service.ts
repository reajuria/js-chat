import { Injectable } from '@angular/core';
import { User } from '@js-chat/common';
import { UserClientService } from '@js-chat/ng-api-client';
import { isNil } from 'lodash';
import { Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new Subject<User>();
  user$ = this.userSubject.pipe(shareReplay(1));

  user: User;

  constructor(private userService: UserClientService) {
    this.login('reajuria', '');
  }

  async login(username: string, password: string) {
    this.user = await this.userService.findOne({ username });
    if (isNil(this.user)) {
      // Evaluation data
      this.user = await this.userService.insert({
        alias: 'Rafael',
        username: 'reajuria',
      });
    }
    this.userSubject.next(this.user);
  }
}
