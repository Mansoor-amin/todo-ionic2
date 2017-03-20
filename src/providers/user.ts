import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire } from 'angularfire2';



@Injectable()
export class User {

  user :{
    fName: string,
    lName: string,
    contact: number,
    email: string,
    uid: string
  };
  constructor(private af: AngularFire) {
    console.log('Hello UserService Provider');

  }
  setUser(user:{
    fName: string,
    lName: string,
    contact: number,
    email: string,
    uid: string,
    $key?: string
  }){
    this.user = user;
    console.log('login user is: ' + this.getFullName());
  }

  getProfile (uid){
    return this.af.database.list('profiles',{
  query: {
    orderByChild: 'uid',
    equalTo: uid
  }
});
  }

  getFullName(){
    return this.user.fName + " " + this.user.lName;
  }
  getUser(){
    return this.user;
  }

}
