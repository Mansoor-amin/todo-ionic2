import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { Auth } from './../providers/auth';
import { Todo } from './../providers/todo';
import { User } from './../providers/user';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyDEJiMIxFc_sTeXJa3uu0XQ58ekWELckSI",
  authDomain: "todo-86658.firebaseapp.com",
  databaseURL: "https://todo-86658.firebaseio.com",
  storageBucket: "todo-86658.appspot.com",
  messagingSenderId: "603727531418"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Auth,Todo,User]
})
export class AppModule {}
