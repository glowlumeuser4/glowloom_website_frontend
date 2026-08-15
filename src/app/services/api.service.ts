import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 👈 Updated: Added status, full_description, and applications to match the database model
export interface Project {
  id?: string;
  project_name: string;
  status: string;
  reference_images_for_image: string[];
  full_description: string;
  applications: string;
  technologies_used: string;
  createdAt?: string;
}

export interface ContactData {
  id?: string;
  user_first_name: string;
  user_last_name: string;
  user_contact_number: string;
  user_email_id: string;
  purpouse_of_contact?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : 'https://glowloom-website-backend.vercel.app/api';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  submitContact(data: ContactData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact`, data);
  }

  getContacts(page: number, limit: number, startDate?: string, endDate?: string): Observable<any> {
    let url = `${this.apiUrl}/contact?page=${page}&limit=${limit}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    return this.http.get<any>(url);
  }
}
