import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { tap, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  playerTwoInfo:any = new BehaviorSubject([]);
  playerOneInfo:any = new BehaviorSubject([]);
  public isLoading1$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoading2$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private ACCESS_TOKEN ="1688f098354af4d33fce90310e12ed15c0760c72";

  config = {headers: {
    'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
    'Accept': 'application/json;odata=verbose'
    }
  };

  constructor(private http: HttpClient) {}

  public getUser(username: string, whichUser: number): Observable<IUser> {
    if (whichUser == 1) this.isLoading1$.next(true);
    else this.isLoading2$.next(true);

    return this.http.get<IUser>(`https://api.github.com/users/${username}`, this.config)
      .pipe(
        delay(400),
        tap(() => {
          if (whichUser == 1) this.isLoading1$.next(false);
          else this.isLoading2$.next(false);
        }),
        map((userInfo: IUser) => {
          return userInfo;
        })
      );
  }

  public getRepos(username: string) {
    return this.http.get(`https://api.github.com/users/${username}/repos?per_page=100`, this.config);
  }
  
}


