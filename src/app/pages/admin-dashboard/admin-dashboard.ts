import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { LogoutButton } from "../../components/logout-button/logout-button";
import { Button } from "../../components/button/button";
import { collection, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [LogoutButton, Button, CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboard implements OnInit {

  doctors: any[] = [];

  constructor(private router: Router, private firestore: Firestore, private zone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    const doctorsRef = collection(this.firestore, 'doctors');
    onSnapshot(doctorsRef, (snapshot) => {
      this.zone.run(() => {
        this.doctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Doctors updated:', this.doctors);
        this.cdr.detectChanges();
      });
    });
  }

  editDoctor(id: string) {
    this.router.navigate(['/edit-doctor', id]);
  }

  async deleteDoctor(id: string) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      await deleteDoc(doc(this.firestore, 'doctors', id));
      alert('Doctor deleted successfully.');
    }
  }
}