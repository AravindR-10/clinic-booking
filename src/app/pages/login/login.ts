import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, getDocs } from '@angular/fire/firestore';
import { collection, query, where } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: any = {
    email: '',
    password: ''
  };
  constructor(private router: Router, private firestore: Firestore) { }

  async login() {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('email', '==', this.loginForm.email), where('password', '==', this.loginForm.password));

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {

        const userData = snapshot.docs[0].data();
        const role = userData['role'];

        localStorage.setItem('userRole', role);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', snapshot.docs[0].id);

        alert('Login successful!');

        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login: ', error);
      alert('Login failed. Please try again.');
    }
  }
}
