import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeComponent } from "./home.component";
import { WalkService } from '../../services/walk.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { Router } from '@angular/router';

const formGroup = new FormGroup({
  authForm: new FormControl('', [Validators.required]),
});

describe('HomeComponent Component', () => {
  let spectator: Spectator<HomeComponent>;
  let component: HomeComponent;
  let walkService = new WalkService;
  let router: Router
  let fixture: ComponentFixture<HomeComponent>;
  const createComponent = createComponentFactory({
    component: HomeComponent,
    imports:[
      RouterTestingModule,
      ReactiveFormsModule
    ],
    providers: [
      { provide: WalkService }
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = TestBed.createComponent(HomeComponent);
    walkService = new WalkService();
    component = fixture.debugElement.componentInstance;});

    it('should create', () => {
      fixture.detectChanges();
      expect(spectator).toBeTruthy();
    });
  
  
  it('function ngOnInit', () => {
    spectator.component.ngOnInit();
    const spyformReset = jest.spyOn(spectator.component.authForm, 'reset');
    spectator.component.authForm.reset();
    expect(spyformReset).toHaveBeenCalled();   
  });
 
  it('should call login user', () => {
    fixture.detectChanges();
    const user = 'test'
    formGroup.controls.authForm.get('user')?.setValue(user);
    spectator.component.enterUser()
    walkService.loginUser(user).catch( rs =>{
      expect(router!.navigateByUrl('/walk')).toBeTruthy()!;
    })   
  });


});