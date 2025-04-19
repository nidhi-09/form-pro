import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { FormService } from '../form.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let formServiceSpy: jasmine.SpyObj<FormService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;


  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FormService', ['submitUser']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{ provide: FormService, useValue: spy },
        { provide: ToastrService, useValue: toastrSpy }]
    }).compileComponents();

    formServiceSpy = TestBed.inject(FormService) as jasmine.SpyObj<FormService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the register component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 form controls', () => {
    const controls = component.registerForm.controls;
    expect(Object.keys(controls).length).toBe(3);
    expect(controls['fullName']).toBeTruthy();
    expect(controls['email']).toBeTruthy();
    expect(controls['password']).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should be valid when all fields are filled correctly', () => {
    component.registerForm.setValue({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123'
    });
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should call submitUser on valid form submission', () => {
    component.registerForm.setValue({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123'
    });

    formServiceSpy.submitUser.and.returnValue(of({}));

    component.onSubmit();

    expect(formServiceSpy.submitUser).toHaveBeenCalledWith({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123'
    });
    expect(toastrSpy.success).toHaveBeenCalledWith('User registered successfully!', 'Success');
  });

  it('should not call submitUser if form is invalid', () => {
    component.registerForm.setValue({
      fullName: '',
      email: '',
      password: ''
    });

    component.onSubmit();

    expect(formServiceSpy.submitUser).not.toHaveBeenCalled();
    expect(component.successMessage).toBe('');
  });
});
