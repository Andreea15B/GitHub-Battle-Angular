import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  playerTwoInfo:any = new BehaviorSubject([]);
  playerOneInfo:any = new BehaviorSubject([]);
  public isLoading1$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoading2$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  getUserOne(username) {
    this.isLoading1$.next(true);
    return this.http.get<IUser[]>(`https://api.github.com/users/${username}`)
    .pipe(
      delay(500),
      tap(() => this.isLoading1$.next(false))
    )
    .subscribe((res) => {
        console.log("Success for user1: ", res);
        this.playerOneInfo.next(res);
      },
      (err) => {
        console.log("Error in user1 service: ", err)
        this.playerOneInfo = null;
      }
    );
  }

  getUserTwo(username) {
    this.isLoading2$.next(true);
    this.http.get(`https://api.github.com/users/${username}`)
    .pipe(
      delay(500),
      tap(() => this.isLoading2$.next(false))
    )
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


