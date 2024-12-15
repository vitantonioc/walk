import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WalkService } from '../../services/walk.service';
import { HomeLogin } from '../../../core/enum/currentUser.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  public authForm: FormGroup = this.form.group({
    user: ['', [ Validators.required ] ]
  });

  public enterCreate: string = HomeLogin.ENTER_CREATE_NAME;
  public name: string = HomeLogin.NAME;
  public enter: string = HomeLogin.ENTER;

  constructor(
    private form: FormBuilder,
    private walkService: WalkService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authForm.reset();
  }

  enterUser() {
    if (this.authForm.status === "VALID") {
      this.walkService.loginUser(this.authForm.value.user).then(() => {
        this.router.navigateByUrl('/walk');
      });
    }
  }
}
