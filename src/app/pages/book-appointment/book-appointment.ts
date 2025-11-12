import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-appointment.html',
  styleUrls: ['./book-appointment.css']
})
export class BookAppointment implements OnInit {
  doctorId!: string;
  doctorData: any;
  appointmentForm!: FormGroup;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.doctorId = this.route.snapshot.paramMap.get('doctorId')!;
    this.appointmentForm = this.fb.group({
      slot: ['', Validators.required]
    });
    this.loadDoctorData();
  }

  async loadDoctorData() {
    try {
    const doctorRef = doc(this.firestore, 'doctors', this.doctorId);
    const doctorSnap = await getDoc(doctorRef);
    this.doctorData = doctorSnap.data();
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async bookAppointment() {
    if (this.appointmentForm.invalid) {
      alert('Please select a slot');
      return;
    }

    const selectedSlot = this.appointmentForm.value.slot;
    const appointmentsRef = collection(this.firestore, 'appointments');

    await addDoc(appointmentsRef, {
      userId: localStorage.getItem('userId'),
      doctorId: this.doctorId,
      doctorName: this.doctorData.name,
      appointmentDate: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime
    });

    alert('Appointment booked successfully!');
    this.router.navigate(['/user-dashboard']);
  }
}