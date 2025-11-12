import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-edit-doctor',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-doctor.html',
  styleUrl: './edit-doctor.css',
})
export class EditDoctor implements OnInit {

  doctorForm!: FormGroup;
  doctorId!: string;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private firestore: Firestore) { }

  ngOnInit() {
    this.doctorId = this.route.snapshot.paramMap.get('id')!;
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      availableSlots: this.fb.array([]),
    });
    this.loadDoctorData();
  }

  get availableSlots() {
    return this.doctorForm.get('availableSlots') as FormArray;
  }

  async loadDoctorData() {
    const doctorRef = doc(this.firestore, 'doctors', this.doctorId);
    const doctorSnap = await getDoc(doctorRef);
    if (doctorSnap.exists()) {
      const data: any = doctorSnap.data();
      this.doctorForm.patchValue({
        name: data.name,
        specialization: data.specialization,
      });
      data.availableSlots.forEach((slot: any) => {
        this.availableSlots.push(this.fb.group({
          date: [slot.date, Validators.required],
          startTime: [slot.startTime, Validators.required],
          endTime: [slot.endTime, Validators.required],
        }));
      });
    }
  }

  addSlot() {
    this.availableSlots.push(this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    }));
  }

  removeSlot(index: number) {
    this.availableSlots.removeAt(index);
  }

  async updateDoctor() {
    if (this.doctorForm.valid) {
      const doctorRef = doc(this.firestore, 'doctors', this.doctorId);
      await updateDoc(doctorRef, this.doctorForm.value);
      alert('Doctor updated successfully!');
      this.router.navigate(['/admin-dashboard']);
    }
    else {
      alert('Please fill all required fields.');
    }
  }
}
