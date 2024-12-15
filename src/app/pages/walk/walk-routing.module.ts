import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalkComponent } from './walk.component';

const routes: Routes = [
  {
    path: '',
    component: WalkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalkRoutingModule { }
