import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() showAlert = false;
  @Input() alertType: 'success' | 'error' = 'success';
  @Input() alertMessage = '';

  closeAlert() {
    this.showAlert = false;
  }
}
