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
    playerOneInfo: IUser = null;
    playerTwoInfo: any = null;
    player1_score: number;
    player2_score: number;
    gotPlayerOne: boolean = false;
    gotPlayerTwo: boolean = false;
    winner: number;
    buttonColor1: string = 'rgb(255, 255, 255, 0)';
    buttonColor2: string = 'rgb(255, 255, 255, 0)';
    in_battle: boolean = false;
    private subscription1: Subscription;
    private subscription2: Subscription;
    isLoading1: boolean = false;
    isLoading2: boolean = false;
    errorUser1: boolean = false;
    errorUser2: boolean = false;
    repoNames1: string[] = [];
    repoNames2: string[] = [];

    constructor(private githubService: GithubService) {}

    ngOnInit(): void {
        this.subscription1 = this.githubService.isLoading1$.subscribe((loading: boolean) => {
            this.isLoading1 = loading;
        });
        this.subscription2 = this.githubService.isLoading2$.subscribe((loading: boolean) => {
            this.isLoading2 = loading;
        });
    }

    public getPlayerOne() {
        this.githubService.getUserOne(this.playerOneUsername)
            .subscribe((userInfo: IUser) => {
                this.playerOneInfo = userInfo;
                if(this.playerOneInfo) {
                    this.gotPlayerOne = true;
                    this.errorUser1 = false;
                }
                this.player1_score = (this.playerOneInfo.followers + this.playerOneInfo.public_repos)*12;
                this.getRepos(this.playerOneUsername, this.repoNames1);
            },
            error => {
                this.errorUser1 = true;
                this.isLoading1 = false;
                this.gotPlayerOne = false;
            });
    }

    public getPlayerTwo() {
        this.githubService.getUserTwo(this.playerTwoUsername)
            .subscribe((userInfo: IUser) => {
                this.playerTwoInfo = userInfo;
                if(this.playerTwoInfo) {
                    this.gotPlayerTwo = true;
                    this.errorUser2 = false;
                }
                this.player2_score = (this.playerTwoInfo.followers + this.playerTwoInfo.public_repos)*12;
                this.getRepos(this.playerTwoUsername, this.repoNames2);
            },
            error => {
                this.errorUser2 = true;
                this.isLoading2 = false;
                this.gotPlayerTwo = false;
            });
    }

    public getRepos(username: string, repoNamesArray: string[]) {
        this.githubService.getRepos(username)
            .subscribe((res: any) => {
                console.log("res: ", res);
                for(let repo_details of res) {
                    console.log("repo_details: ", repo_details);
                    console.log("repo_details.name: ", repo_details.name);
                    repoNamesArray.push(repo_details.name);
                }
            });
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
        this.errorUser1 = false;
    }

    resetSecondUser() : void {
        this.gotPlayerTwo = false;
        this.errorUser2 = false;
    }

    public ngOnDestroy(): void {
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
    }
}