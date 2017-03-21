import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the User page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
