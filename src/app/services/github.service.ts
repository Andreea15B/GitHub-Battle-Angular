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

  private CLIENT_ID = "c2a5e9744aab484ede51";
  private CLIENT_SECRET = "97a748734cde8dba02b32aa6373dadd1f97d32ef";
  private params = `?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`;

  constructor(private http: HttpClient) {}


  public getUserOne(username: string): Observable<IUser> {
    this.isLoading1$.next(true);
    return this.http.get<IUser>(`https://api.github.com/users/${username}${this.params}`)
      .pipe(
        delay(400),
        tap(() => this.isLoading1$.next(false)),
        map((userInfo: IUser) => {
          return userInfo;
        })
      );
  }

  public getUserTwo(username: string): Observable<IUser> {
    this.isLoading2$.next(true);
    return this.http.get<IUser>(`https://api.github.com/users/${username}${this.params}`)
      .pipe(
        delay(400),
        tap(() => this.isLoading2$.next(false)),
        map((userInfo: IUser) => {
          return userInfo;
        })
      );
  }

  public getRepos(username: string) {
    return this.http.get(`https://api.github.com/users/${username}/repos${this.params}&per_page=100`);
  }
  
}


