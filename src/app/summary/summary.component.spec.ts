import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryComponent } from './summary.component';
import { FormService } from '../form.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let formServiceSpy: jasmine.SpyObj<FormService>;

  const mockUsers = [
    { fullName: 'Alice Johnson', email: 'alice@example.com' },
    { fullName: 'Bob Smith', email: 'bob@example.com' },
    { fullName: 'Charlie Lee', email: 'charlie@example.com' }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FormService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      imports: [FormsModule],
      providers: [{ provide: FormService, useValue: spy }]
    }).compileComponents();

    formServiceSpy = TestBed.inject(FormService) as jasmine.SpyObj<FormService>;
    formServiceSpy.getUsers.and.returnValue(of(mockUsers));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the summary component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(component.users.length).toBe(3);
    expect(component.filteredUsers.length).toBe(3);
  });

  it('should filter users by full name', () => {
    component.filterTerm = 'Alice';
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].fullName).toBe('Alice Johnson');
  });

  it('should filter users by email', () => {
    component.filterTerm = 'bob@example.com';
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].email).toBe('bob@example.com');
  });

  it('should sort users by fullName ascending and then descending', () => {
    component.sortBy('fullName');
    expect(component.filteredUsers[0].fullName).toBe('Alice Johnson');

    component.sortBy('fullName');
    expect(component.filteredUsers[0].fullName).toBe('Charlie Lee');
  });
});
