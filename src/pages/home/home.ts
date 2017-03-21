import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';

import { Auth } from './../../providers/auth';
import { User } from './../../providers/user';
import { Todo } from './../../providers/todo';

import { UserPage } from '../user/user';
import { AuthPage } from '../auth/auth';
import { ModalPage } from '../modal/modal';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user;
  todos = [];
  todoForm = this.fb.group({
    title: ["", Validators.required],
    message: ["", Validators.required],
    time: [new Date().toTimeString(), Validators.required],
    date: [new Date().toDateString(), Validators.required],
    completed: [false, Validators.required]
  });
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public fb: FormBuilder,
              public modalCtrl: ModalController,
              private Auth : Auth,
              private User : User,
              private Todo :Todo
  ) {
    this.user = this.User.getUser() || {
    fName: "Ali",
    lName: "Ali",
    contact: "4654879799",
    email: "ali@ali.com",
    uid: "dgeyh5+rh565dg5df+j5fg+jhjgh+j5gj9ghj4fg4j"
  }
  this.Todo.gettodo().subscribe((val)=>{
    console.log(val);
    this.todos = val
  })
}

navigateToProfile(){
  this.navCtrl.push(UserPage, {user : this.user});
}
logOut(){
  this.Auth.logOut()
    .then(()=>{
        console.log("logout");
        this.navCtrl.push(AuthPage);
        this.presentToast("Logout Successfully login to continue.");        

    })
    .catch((err)=>{
        this.presentToast(err.message);
    })
}

add(event){
  console.log(this.todoForm.value)
  if(this.todoForm.valid){
    this.Todo.addtodo(this.todoForm.value)
  .then((val)=>{
      console.log(val);
        this.presentToast("TODO ADDED");        

    })
    .catch((err)=>{
        this.presentToast(err.message);
    })
  }
  
}

delete(data){
  this.Todo.removetodo(data);
}

complet(data){
  data.completed= true;
  console.log(data);
  this.Todo.updatetodo(data);
}


edit(data){
   let modal = this.modalCtrl.create(ModalPage,{data: data});
    modal.present();
}


presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
