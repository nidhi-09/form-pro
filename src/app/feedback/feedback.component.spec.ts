import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FeedbackComponent } from './feedback.component';
// Ensure the correct path to FormService
import { FormService } from '../form.service';
import { of } from 'rxjs';
import { Feedback } from '../feedback.model';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let formServiceSpy: jasmine.SpyObj<FormService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FormService', ['submitFeedback']);

    await TestBed.configureTestingModule({
      declarations: [FeedbackComponent],
      imports: [FormsModule],
      providers: [{ provide: FormService, useValue: spy }]
    }).compileComponents();

    formServiceSpy = TestBed.inject(FormService) as jasmine.SpyObj<FormService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the feedback component', () => {
    expect(component).toBeTruthy();
  });

  it('should call submitFeedback on valid feedback submission', () => {
    const mockFeedback: Feedback = {
      message: 'Awesome app!',
      rating: 5
    };
    component.feedback = mockFeedback;

    const mockForm = {
      invalid: false,
      resetForm: jasmine.createSpy('resetForm')
    } as any;

    formServiceSpy.submitFeedback.and.returnValue(of({}));

    component.onSubmit(mockForm);

    expect(formServiceSpy.submitFeedback).toHaveBeenCalledWith(mockFeedback);
    expect(mockForm.resetForm).toHaveBeenCalled();
    expect(component.submitted).toBeTrue();
  });

  it('should NOT call submitFeedback if form is invalid', () => {
    const mockForm = {
      invalid: true,
      resetForm: jasmine.createSpy('resetForm')
    } as any;

    component.onSubmit(mockForm);

    expect(formServiceSpy.submitFeedback).not.toHaveBeenCalled();
    expect(mockForm.resetForm).not.toHaveBeenCalled();
    expect(component.submitted).toBeFalse();
  });
});
