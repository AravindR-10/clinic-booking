import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LogoutButton } from "../../components/logout-button/logout-button";
import { Button } from "../../components/button/button";
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { deleteDoc, doc } from 'firebase/firestore';
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
  loading = true;
  err: string | null = null;

  constructor(private router: Router, private firestore: Firestore, private cdr: ChangeDetectorRef) { }

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