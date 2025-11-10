import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { LogoutButton } from '../../components/logout-button/logout-button';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection, onSnapshot } from 'firebase/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  imports: [LogoutButton, CommonModule],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {
  doctors: any[] = [];

  constructor(private firestore: Firestore, private router: Router, private zone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    const doctorsRef = collection(this.firestore, 'doctors');
    onSnapshot(doctorsRef, (snapshot) => {
      this.zone.run(() => {
        this.doctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        this.cdr.detectChanges();
      });
    });
  }

  bookAppointment(doctorId: string) {
    this.router.navigate(['/book-appointment', doctorId]);
  }

}
