import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-view-bookings',
  imports: [CommonModule],
  templateUrl: './view-bookings.html',
  styleUrl: './view-bookings.css',
})
export class ViewBookings implements OnInit {
  bookings: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private firestore: Firestore, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      const bookingsRef = collection(this.firestore, 'appointments');
      const querySnapshot = await getDocs(bookingsRef);
      this.bookings = querySnapshot.docs.map(doc => doc.data());
    } catch (err: any) {
      this.error = 'Failed to load bookings.';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
