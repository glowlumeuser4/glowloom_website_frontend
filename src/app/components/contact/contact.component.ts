import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService, ContactData } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData: ContactData = {
    user_first_name: '',
    user_last_name: '',
    user_contact_number: '',
    user_email_id: '',
    purpouse_of_contact: ''
  };

  submitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.submitting = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.apiService.submitContact(this.formData).subscribe({
      next: (res) => {
        this.successMessage = 'Your inquiry has been successfully sent to Glow Loom!';
        this.submitting = false;
        form.resetForm();
        this.formData = {
          user_first_name: '',
          user_last_name: '',
          user_contact_number: '',
          user_email_id: '',
          purpouse_of_contact: ''
        };
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'Failed to submit message. Please try again.';
        this.submitting = false;
      }
    });
  }
}
