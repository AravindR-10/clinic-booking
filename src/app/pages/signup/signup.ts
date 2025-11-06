import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  model: any = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private firestore: Firestore, private router: Router) {}

  async signup() {
    try {
      const usersRef = collection(this.firestore, 'users');
      await addDoc(usersRef, {
        username: this.model.username,
        email: this.model.email,
        password: this.model.password,
        role: 'user'
    });
    alert('Signup successful!');
    this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing up: ', error);
      alert('Signup failed. Please try again.');
    }
  }
}
