import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Auth } from './../../providers/auth';
import { User } from './../../providers/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user;
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              private Auth : Auth,
              private User : User
  ) {
    this.user = this.User.getUser()
  }

}
