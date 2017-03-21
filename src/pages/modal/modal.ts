import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Todo } from './../../providers/todo';
import { ToastController } from 'ionic-angular';




@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
data;
title;
message;
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private Todo :Todo,
               public toastCtrl: ToastController,
) {
    this.data = this.navParams.get("data");
    this.title = this.data.title;
    this.message = this.data.message;
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  edit(){
    this.data.title = this.title;
    this.data.message = this.message;
    this.data.date = new Date().toDateString();
    this.data.time = new Date().toTimeString();

    this.Todo.updatetodo(this.data)
    .then(()=>{
      this.presentToast("updated Successfully.");
    })
    .catch((err)=>{
      this.presentToast(err.message);
    })
  }


  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


}
