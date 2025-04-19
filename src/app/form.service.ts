import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_FEEDBACK, MOCK_USERS } from './mock-data.data';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  // [....] is spread operator, it creates a new array instead of using the already existing array to avoid accidental changes
  private users = [...MOCK_USERS];
  private feedback = [...MOCK_FEEDBACK];

  getUsers(): Observable<any[]> {
    return of(this.users);
  }


  submitUser(data: any): Observable<any> {
    this.users.push(data);
    return of(data);
  }

  submitFeedback(feedback: any): Observable<any> {
    this.feedback.push(feedback);
    return of(feedback);
  }

  getFeedback(): Observable<any[]> {
    return of(this.feedback);
  }

  constructor() { }
}
