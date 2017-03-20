import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { Auth } from './../../providers/auth';
import { User } from './../../providers/user';

import { HomePage } from '../home/home';





@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public fb: FormBuilder,
              public toastCtrl: ToastController,
              private Auth : Auth,
              private User : User
      ) {}

check = false;
loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

createUserForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    password1: ["", Validators.required],
    fName: ["", Validators.required],
    lName: ["", Validators.required],
    contact: ["", Validators.required]
  }); 

login(){
      this.Auth.login({email: this.loginForm.value.email, password: this.loginForm.value.password})
        .then((user)=>{
          localStorage.setItem('uid', user.uid);
          console.log(user.uid);

          this.User.getProfile(user.uid)
            .subscribe((val)=>{
              this.User.setUser(val[0]);

              this.presentToast(val[0].fName +' login successfully');
  
              // navigate to home page 
              this.navCtrl.push(HomePage);
            })
        })
        .catch((err)=>{
            this.presentToast(err.message);
        })
  };


  
signup(){

  if(this.createUserForm.value.password === this.createUserForm.value.password1){

    this.Auth.signup({email: this.createUserForm.value.email, password: this.createUserForm.value.password})
      .then((user)=>{
          localStorage.setItem('uid', user.uid);
          let profileData = {
          fName: this.createUserForm.value.fName,
          lName: this.createUserForm.value.lName,
          contact: this.createUserForm.value.contact,
          email: this.createUserForm.value.email,
          uid: user.uid
        }
          this.Auth.createProfile(profileData)
            .then(()=>{
                this.User.setUser(profileData);

                this.presentToast("user created creating Profile");
                // navigate to home page 
                this.navCtrl.push(HomePage)
            })
            .catch((err)=>{
                this.presentToast(err.message);
            })

      })
      .catch((err)=>{
          this.presentToast(err.message);
      })
  }else { 
    this.presentToast("password dont match"); 
  }
};


  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }


toggle(){
  if(this.check){
    this.check = false;
  }
  else{
      this.check = true;
  }
}

presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
