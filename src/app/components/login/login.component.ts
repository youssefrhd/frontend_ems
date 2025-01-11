import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isDarkMode: boolean = false;

  // Function to toggle dark mode
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    // Add or remove the 'dark' class from the <body> element to apply dark mode globally
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }


}
