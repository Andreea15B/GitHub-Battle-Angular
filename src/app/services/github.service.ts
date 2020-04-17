import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  playerTwoInfo:any = new BehaviorSubject([]);
  playerOneInfo:any = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getUserOne(username){
    this.http.get(`https://api.github.com/users/${username}`)
    .subscribe(
      (res) => {
        console.log("Success for user1: ", res);
        this.playerOneInfo.next(res);
      },
      (err) => {
        console.log("Error in user1 service: ", err)
        this.playerOneInfo = null;
      }
    )
  }

  getUserTwo(username){
    this.http.get(`https://api.github.com/users/${username}`)
    .subscribe(
      (res) => {
        console.log("Success for user2: ", res);
        this.playerTwoInfo.next(res);
      },
      (err) => {
        console.log("Error in user2 service: ", err)
        this.playerOneInfo = null;
      }
    )
  }
  
}


