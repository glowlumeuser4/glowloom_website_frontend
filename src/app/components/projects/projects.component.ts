import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Project } from '../../services/api.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories: string[] = ['All', 'Angular', 'Node.js', 'Express', 'PostgreSQL'];
  selectedCategory = 'All';
  loading = true;
  error: string | null = null;
  
  // Lightbox Modal state
  selectedProject: Project | null = null;
  activeImageIndex = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.loading = true;
    this.apiService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.filteredProjects = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load projects from PostgreSQL.';
        this.loading = false;
      }
    });
  }

  filterCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => 
        p.technologies_used.toLowerCase().includes(category.toLowerCase())
      );
    }
  }

  openLightbox(project: Project): void {
    this.selectedProject = project;
    this.activeImageIndex = 0;
  }

  closeLightbox(): void {
    this.selectedProject = null;
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    if (this.selectedProject) {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.selectedProject.reference_images_for_image.length;
    }
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    if (this.selectedProject) {
      this.activeImageIndex = (this.activeImageIndex - 1 + this.selectedProject.reference_images_for_image.length) % this.selectedProject.reference_images_for_image.length;
    }
  }
}
