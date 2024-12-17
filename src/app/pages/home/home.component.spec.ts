import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WalkService } from '../../services/walk.service';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerMock: jest.Mocked<Router>;
  let walkServiceMock: jest.Mocked<WalkService>;


  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mocks dependencies
    routerMock = {
      navigateByUrl: jest.fn()
    } as unknown as jest.Mocked<Router>;

    walkServiceMock = {
      loginUser: jest.fn()
    } as unknown as jest.Mocked<WalkService>;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HomeComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerMock },
        { provide: WalkService, useValue: walkServiceMock }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle error and not navigate when loginUser fails', async () => {
    component.authForm.controls['user'].setValue('validUser');
    component.authForm.controls['user'].markAsTouched();
    component.authForm.controls['user'].markAsDirty();
    fixture.detectChanges();

    // We simulate an error in loginUser
    walkServiceMock.loginUser.mockRejectedValueOnce(new Error('Login failed'));

    // We call the enterUser() method
    await component.enterUser();

    // We verify that loginUser has been called with the correct value
    expect(walkServiceMock.loginUser).toHaveBeenCalledWith('validUser');

    // We verify that the navigation did not occur due to the error
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();

    // We verify that console.error was called with the correct message
    expect(console.error).toHaveBeenCalledWith('Error during login', new Error('Login failed'));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
