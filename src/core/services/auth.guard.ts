import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import { WalkService } from '../../app/services/walk.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor ( private walkService: WalkService ) {}

  canLoad(): Observable<boolean> {
    return of(this.walkService.isAuth());
  }
}
