import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/services/auth.guard';

const routes: Routes = [
  {
    path: 'walk',
    loadChildren: () => import('./pages/walk/walk.module').then( m => m.WalkModule ),
    canLoad: [ AuthGuard ]
  },{
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule )
  },{
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
