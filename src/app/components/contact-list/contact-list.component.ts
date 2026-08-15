import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, ContactData } from '../../services/api.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  contacts: ContactData[] = [];
  loading = true;
  error: string | null = null;

  // Pagination state
  page = 1;
  limit = 10;
  totalPages = 1;
  totalItems = 0;

  // Date Filters
  startDate = '';
  endDate = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getContacts(this.page, this.limit, this.startDate, this.endDate).subscribe({
      next: (res) => {
        this.contacts = res.data;
        this.totalPages = res.totalPages;
        this.totalItems = res.totalItems;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load contacted peoples list.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.page = 1; // Reset to page 1 on new filter
    this.fetchContacts();
  }

  resetFilters(): void {
    this.startDate = '';
    this.endDate = '';
    this.page = 1;
    this.fetchContacts();
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.fetchContacts();
    }
  }

  onLimitChange(): void {
    this.page = 1; // Reset to page 1 on limit resizing
    this.fetchContacts();
  }
}
