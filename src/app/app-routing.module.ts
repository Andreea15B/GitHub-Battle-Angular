import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BattleComponent } from './battle/battle.component';

const routes: Routes = [
  {path: '', component: BattleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}