import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {

  @Input() label: string = "";
  @Input() route: string = "";

  constructor(private router: Router) {}

  navigate() {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }

}
