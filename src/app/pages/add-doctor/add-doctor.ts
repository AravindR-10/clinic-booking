import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-doctor.html',
  styleUrl: './add-doctor.css',
})
export class AddDoctor {

  doctorForm : FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore, private router: Router) {

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      availableSlots: this.fb.array([])
    });
  }

  get availableSlots() {
    return this.doctorForm.get('availableSlots') as FormArray;
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

  async saveDoctor() {
    if (this.doctorForm.invalid) return alert('Please fill all required fields.');
    const doctorsRef = collection(this.firestore, 'doctors');
    await addDoc(doctorsRef, this.doctorForm.value);
    alert('Doctor added successfully.');
    this.router.navigate(['/admin-dashboard']);
  }
}
