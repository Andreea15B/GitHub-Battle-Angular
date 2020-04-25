import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IUser } from '../models/user.model';
import { tap, delay, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  playerTwoInfo:any = new BehaviorSubject([]);
  playerOneInfo:any = new BehaviorSubject([]);
  public isLoading1$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoading2$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  public getUserOne(username: string): Observable<IUser> {
    this.isLoading1$.next(true);
    return this.http.get<IUser>(`https://api.github.com/users/${username}`)
      .pipe(
        delay(400),
        tap(() => this.isLoading1$.next(false)),
        map((userInfo: IUser) => {
          console.log("user1Info in service: ", userInfo);
          return userInfo;
        })
      );
  }

  public getUserTwo(username: string): Observable<IUser> {
    this.isLoading2$.next(true);
    return this.http.get<IUser>(`https://api.github.com/users/${username}`)
      .pipe(
        delay(400),
        tap(() => this.isLoading2$.next(false)),
        map((userInfo: IUser) => {
          console.log("user2Info in service: ", userInfo);
          return userInfo;
        })
      );
  }
  
}


