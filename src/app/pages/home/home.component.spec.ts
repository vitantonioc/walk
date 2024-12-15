import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeComponent } from "./home.component";
import { WalkService } from '../../services/walk.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

const formGroup = new FormGroup({
  authForm: new FormControl('', [Validators.required]),
});

describe('HomeComponent Component', () => {
  let spectator: Spectator<HomeComponent>;
  let component: HomeComponent;
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
    component = fixture.debugElement.componentInstance;});
  
  it('function ngOnInit', () => {
    spectator.component.ngOnInit();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(spectator).toBeTruthy();
  });

  it('should call user form element', () => {
    fixture.detectChanges();
    expect(formGroup.controls.authForm.get('user')).toBeFalsy()!;
  });

  it('should call form Valid', () => {
    fixture.detectChanges();
    const user = 'test'
    formGroup.controls.authForm.get('user')?.setValue(user);
    expect(formGroup.controls.authForm.status).toBe('INVALID')!;
  });


});