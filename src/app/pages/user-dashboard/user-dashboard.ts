import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LogoutButton } from '../../components/logout-button/logout-button';
import { Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection } from 'firebase/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  imports: [LogoutButton, CommonModule],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {
  doctors: any[] = [];
  loading = true;
  err: string | null = null;

  constructor(private firestore: Firestore, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadDoctors();
  }

  async loadDoctors() {
    try {
      const doctorsRef = collection(this.firestore, 'doctors');
      const querySnapshot = await getDocs(doctorsRef);
      this.doctors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (err: any) {
      this.err = "Failed to load doctors";
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  bookAppointment(doctorId: string) {
    this.router.navigate(['/book-appointment', doctorId]);
  }

}
