import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id?: string;
  project_name: string;
  reference_images_for_image: string[];
  project_description: string;
  technologies_used: string;
  createdAt?: string;
}

export interface ContactData {
  user_first_name: string;
  user_last_name: string;
  user_contact_number: string;
  user_email_id: string;
  purpouse_of_contact?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  submitContact(data: ContactData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact`, data);
  }
}
