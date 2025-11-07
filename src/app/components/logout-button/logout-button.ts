import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
})
export class LogoutButton {

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

}
