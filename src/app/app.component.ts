import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'form-pro';

  toggleTheme() {
    document.body.classList.toggle('light-theme');
    console.log('Current theme:', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  }

}
