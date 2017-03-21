import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';



@Injectable()
export class Auth {

  constructor(private af: AngularFire) {
    console.log('Hello Auth Provider');
  }

  authStatus(){
    this.af.auth.subscribe(
        (user)=>{
          if(user){
            return true;
          }
          else{
            return false;
          }
        }
      )
  }
login(user: {email: string, password: string}){
     return this.af.auth.login(user,{
           provider: AuthProviders.Password,
           method: AuthMethods.Password,
      });
  }

signup(user : {email: string, password: string}){
    return this.af.auth.createUser(user);
}


logOut(){
      localStorage.removeItem('uid');
      console.log('logout')
      return this.af.auth.logout();
}
   createProfile(data : {
    fName: string,
    lName: string,
    contact: number,
    email: string,
    uid: string
  }){
      return this.af.database.list('profiles').push(data);
  }

}
