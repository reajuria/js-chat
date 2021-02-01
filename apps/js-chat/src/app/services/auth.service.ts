import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User, UserData } from '@js-chat/common';
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

  constructor(
    private userService: UserClientService,
    private alertCtrl: AlertController,
  ) {
    this.showLogin();
  }

  async showLogin() {
    const alert = await this.alertCtrl.create({
      message: 'Enter a name and username',
      inputs: [
        {
          id: 'name',
          placeholder: 'Alias',
          name: 'name',
        },
        {
          id: 'username',
          placeholder: 'Username',
          name: 'username',
        },
      ],
      buttons: ['accept'],
      backdropDismiss: false,
      keyboardClose: false,
    });
    alert.present();
    const details = (await alert.onDidDismiss())?.data?.values;
    await this.verifyUser(details);
  }

  async verifyUser(userData: UserData) {
    this.user = await this.userService.findOne({ username: userData.username });
    if (isNil(this.user)) {
      this.user = await this.userService.insert(userData);
    }
    this.login(this.user.username, '');
  }

  async login(username: string, password: string) {
    this.userSubject.next(this.user);
  }
}
