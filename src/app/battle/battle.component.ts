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
    subscription1: Subscription;
    subscription2: Subscription;
    isLoading1: boolean = false;
    isLoading2: boolean = false;
    errorUser1: boolean = false;
    errorUser2: boolean = false;
    repoNames1: string[] = [];
    repoNames2: string[] = [];
    stars1: number = 0;
    stars2: number = 0;
    language1Array: number[] = [];
    language2Array: number[] = [];
    language1: string;
    language2: string;

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
        this.githubService.getUser(this.playerOneUsername, 1)
            .subscribe((userInfo: IUser) => {
                this.playerOneInfo = userInfo;
                if(this.playerOneInfo) {
                    this.gotPlayerOne = true;
                    this.errorUser1 = false;
                }
                this.player1_score = this.playerOneInfo.followers*1 + this.playerOneInfo.public_repos*4 + this.stars1*5;
            },
            error => {
                this.errorUser1 = true;
                this.isLoading1 = false;
                this.gotPlayerOne = false;
            });

        this.getRepos1(this.playerOneUsername);
    }

    public getPlayerTwo() {
        this.githubService.getUser(this.playerTwoUsername, 2)
            .subscribe((userInfo: IUser) => {
                this.playerTwoInfo = userInfo;
                if(this.playerTwoInfo) {
                    this.gotPlayerTwo = true;
                    this.errorUser2 = false;
                }
                this.player2_score = this.playerTwoInfo.followers*1 + this.playerTwoInfo.public_repos*4 + this.stars2*5;
            },
            error => {
                this.errorUser2 = true;
                this.isLoading2 = false;
                this.gotPlayerTwo = false;
            });

        this.getRepos2(this.playerTwoUsername);
    }

    public getRepos1(username: string) {
        this.githubService.getRepos(username)
            .subscribe((res: any) => {
                for(let repo_details of res) {
                    this.repoNames1.push(repo_details.name);
                    this.stars1 += repo_details.stargazers_count;
                    if(this.language1Array[repo_details.language] == null) {
                        this.language1Array[repo_details.language] = 1;
                    }
                    else this.language1Array[repo_details.language] += 1; 
                }
                console.log("language1Array: ", this.language1Array);
                let aux = 0;
                for(let language in this.language1Array) {
                    if(language != "null" && this.language1Array[language] > aux) {
                        aux = this.language1Array[language];
                        this.language1 = language;
                    }
                }
            });
    }

    public getRepos2(username: string) {
        this.githubService.getRepos(username)
            .subscribe((res: any) => {
                for(let repo_details of res) {
                    this.repoNames2.push(repo_details.name);
                    this.stars2 += repo_details.stargazers_count;
                    if(this.language2Array[repo_details.language] == null) {
                        this.language2Array[repo_details.language] = 1;
                    }
                    else this.language2Array[repo_details.language] += 1; 
                }
                console.log("language2Array: ", this.language2Array);
                let aux = 0;
                for(let language in this.language2Array) {
                    if(language != "null" && this.language2Array[language] > aux) {
                        aux = this.language2Array[language];
                        this.language2 = language;
                    }
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