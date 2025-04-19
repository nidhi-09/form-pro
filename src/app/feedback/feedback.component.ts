import { Component, OnInit } from '@angular/core';
import { Feedback } from '../feedback.model';
import { FormService } from '../form.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedback: Feedback = {
    message: '',
    rating: 0
  };

  submitted = false;

  constructor(private formService: FormService) { }

  onSubmit(form: any) {
    if(form.invalid) return;

    this.formService.submitFeedback(this.feedback).subscribe(() => {
      this.submitted = true;

      form.resetForm();
    })
  }

  ngOnInit(): void {
  }

}
