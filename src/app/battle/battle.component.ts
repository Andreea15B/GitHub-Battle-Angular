import { Component, OnInit, ViewChild } from '@angular/core';
import { GithubService } from '../services/github.service';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.css']
})

export class BattleComponent implements OnInit {
    playerOneUsername: string;
    playerTwoUsername: string;
    playerOneInfo: IUser = null;
    playerTwoInfo: IUser = null;
    player1_score: number;
    player2_score: number;
    gotPlayerOne = false;
    gotPlayerTwo = false;
    winner: number;
    buttonColor1: string = 'rgb(255, 255, 255, 0)';
    buttonColor2: string = 'rgb(255, 255, 255, 0)';
    in_battle: boolean = false;
    subscription1: Subscription;
    subscription2: Subscription;
    public isLoading1: boolean = false;
    public isLoading2: boolean = false;

    constructor(private githubService: GithubService, private router: Router) {}

    ngOnInit(): void {
        this.githubService.playerOneInfo.subscribe((user) => {
            this.playerOneInfo = user;
            this.player1_score = (this.playerOneInfo.followers + this.playerOneInfo.public_repos)*12;
        });

        this.githubService.playerTwoInfo.subscribe((user) => {
            this.playerTwoInfo = user;
            this.player2_score = (this.playerTwoInfo.followers + this.playerTwoInfo.public_repos)*12;
        });

        this.githubService.isLoading1$.subscribe((loading: boolean) => {
            this.isLoading1 = loading;
        });
        this.githubService.isLoading2$.subscribe((loading: boolean) => {
            this.isLoading2 = loading;
        });
    }

    getPlayerOne() {
        this.githubService.getUserOne(this.playerOneUsername);
        console.log(this.playerOneInfo);
        if(this.playerOneInfo) {
          this.gotPlayerOne = true;
        }
      }
    
    getPlayerTwo() {
        this.githubService.getUserTwo(this.playerTwoUsername);
        if(this.playerOneInfo) {
            this.gotPlayerTwo = true;
        }
    }

    battle() {
        this.in_battle = true;
        if (this.player1_score > this.player2_score) {
            this.winner = 1;
            this.buttonColor1 = '#222';
        }
        else if (this.player1_score < this.player2_score) {
            this.winner = 2;
            this.buttonColor2 = '#222';
        }
        else this.winner = 3;
    }

    refresh(): void {
        window.location.reload();
    }
}