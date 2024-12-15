import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { ScoreComponent } from './components/score/score.component';
import { BulbComponent } from './components/bulb/bulb.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    ScoreComponent,
    BulbComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ScoreComponent,
    BulbComponent,
    ButtonComponent
  ]
})
export class SharedModule {}
