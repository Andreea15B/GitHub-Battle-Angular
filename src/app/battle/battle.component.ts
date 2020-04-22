import { Component, OnInit, ViewChild } from '@angular/core';
import { GithubService } from '../services/github.service';
import { IUser } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.css']
})

export class BattleComponent implements OnInit {
    playerOneUsername: string;
    playerTwoUsername: string;
    playerOneInfo: any = null;
    playerTwoInfo: any = null;
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
    errorUser1: boolean = false;
    errorUser2: boolean = false;

    constructor(private githubService: GithubService) {}

    ngOnInit(): void {
        
        this.githubService.playerOneInfo.subscribe((user) => {
            this.gotPlayerOne = false;
            this.playerOneInfo = user;
            if(this.playerOneInfo.length != 0) {
                this.gotPlayerOne = true;
                this.errorUser1 = false;
            }
            if(this.playerOneInfo.status == 404) {
                this.errorUser1 = true;
                this.isLoading1 = false;
            }
            this.player1_score = (this.playerOneInfo.followers + this.playerOneInfo.public_repos)*12;
        });

        this.githubService.playerTwoInfo.subscribe((user) => {
            this.gotPlayerTwo = false;
            this.playerTwoInfo = user;
            if(this.playerTwoInfo.length != 0) {
                this.gotPlayerTwo = true;
                this.errorUser2 = false;
            }
            if(this.playerTwoInfo.status == 404) {
                this.errorUser2 = true;
                this.isLoading2 = false;
            }
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
        if(this.playerOneInfo) {
          this.gotPlayerOne = true;
        }
      }
    
    getPlayerTwo() {
        this.githubService.getUserTwo(this.playerTwoUsername);
        if(this.playerTwoInfo) {
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

    resetFirstUser() : void {
        this.gotPlayerOne = false;
    }

    resetSecondUser() : void {
        this.gotPlayerTwo = false;
    }
}