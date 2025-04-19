import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm! : FormGroup;
  submitted = false;
  successMessage = '';

  constructor(private fb : FormBuilder,
              private formService : FormService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    this.formService.submitUser(this.registerForm.value).subscribe(() => {
      this.toastr.success('User registered successfully!', 'Success');
      this.registerForm.reset();
      this.submitted = false;
    });
  }
}
