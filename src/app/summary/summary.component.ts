import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  filterTerm: string = '';

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.formService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = [...users];
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.fullName.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.filterTerm.toLowerCase())
    );
  }

  sortBy(field: string) {
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    this.filteredUsers.sort((a, b) =>
      a[field].toLowerCase() > b[field].toLowerCase() ? dir : -dir
    );
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
}
