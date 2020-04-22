import { NgModule } from '@angular/core';
import { BattleComponent } from './battle.component';
import { GithubService } from '../services/github.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
      BattleComponent
    ],
    imports: [
      HttpClientModule,
      MatProgressSpinnerModule
    ],
    providers: [
      GithubService
    ]
  })
  export class CompetitorModule {}