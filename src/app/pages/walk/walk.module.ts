import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WalkRoutingModule } from './walk-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { WalkComponent } from './walk.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@NgModule({
  declarations: [
    WalkComponent,
    HeaderComponent,
  ],
  imports: [
    WalkRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class WalkModule { }
