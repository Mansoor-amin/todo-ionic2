import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire,FirebaseListObservable } from 'angularfire2';


@Injectable()
export class Todo {

 todo :FirebaseListObservable<{
          title: string,
          message: string,
          date: string,
          time: string,
          completed: boolean
        }[]>;
  uid = "" || localStorage.getItem("uid");

  constructor(private af: AngularFire) {
    console.log('Hello Todo Provider');
      this.uid = localStorage.getItem("uid");
     this.todo = af.database.list('/todos/'+ this.uid);
  }
 

  addtodo(item){
    debugger;
    return this.todo.push(item);
  }
  gettodo(){
    return this.todo;
  }
  removetodo(item){
    return this.todo.remove(item);
  }
  updatetodo(item){
    return this.todo.update(item.$key, item);
  }
  

}
