import { NgModule } from '@angular/core';
import { BattleComponent } from './battle.component';
import { GithubService } from '../services/github.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
      BattleComponent
    ],
    imports: [
      HttpClientModule
    ],
    providers: [
      GithubService
    ]
  })
  export class CompetitorModule {}