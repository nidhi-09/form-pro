import { TestBed } from '@angular/core/testing';
import { FormService } from './form.service';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user and return it via submitUser()', (done) => {
    const user = {
      fullName: 'Nidhi',
      email: 'nidhi@example.com',
      password: 'secure123'
    };

    service.submitUser(user).subscribe(res => {
      expect(res).toEqual(user);
      done();
    });
  });

  it('should return all submitted users via getUsers()', (done) => {
    const user = {
      fullName: 'Test User',
      email: 'test@example.com',
      password: '123456'
    };

    service.submitUser(user).subscribe(() => {
      service.getUsers().subscribe(users => {
        expect(users.length).toBeGreaterThan(0);
        expect(users.some(u => u.email === 'test@example.com')).toBeTrue();
        done();
      });
    });
  });

  it('should add feedback via submitFeedback()', (done) => {
    const feedback = { message: 'Great job!', rating: 5 };

    service.submitFeedback(feedback).subscribe(res => {
      expect(res).toEqual(feedback);
      done();
    });
  });

  it('should return all submitted feedback via getFeedback()', (done) => {
    const feedback = { message: 'Nice UI', rating: 4 };

    service.submitFeedback(feedback).subscribe(() => {
      service.getFeedback().subscribe(items => {
        expect(items.length).toBeGreaterThan(0);
        expect(items.some(f => f.message === 'Nice UI')).toBeTrue();
        done();
      });
    });
  });
});
