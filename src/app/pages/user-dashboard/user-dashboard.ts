import { Component } from '@angular/core';
import { LogoutButton } from '../../components/logout-button/logout-button';

@Component({
  selector: 'app-user-dashboard',
  imports: [LogoutButton],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {

}
