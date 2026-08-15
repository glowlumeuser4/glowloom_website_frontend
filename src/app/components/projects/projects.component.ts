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
  categories: string[] = ['All'];
  selectedCategory = 'All';
  loading = true; // Shows the loading state while waiting for Neon database to wake up
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
    this.error = null;
    
    this.apiService.getProjects().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.projects = data;
          this.filteredProjects = data;
          
          // Re-generate categories dynamically based on the technologies used in the database
          this.generateCategories();
        } else {
          this.projects = [];
          this.filteredProjects = [];
          this.categories = ['All'];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch projects from Vercel/Neon:', err);
        this.error = 'Failed to load projects from the database. Please try again.';
        this.loading = false;
      }
    });
  }

  generateCategories(): void {
    const techSet = new Set<string>();
    this.projects.forEach(p => {
      if (p.technologies_used) {
        p.technologies_used.split(',').forEach(tech => {
          techSet.add(tech.trim());
        });
      }
    });
    this.categories = ['All', ...Array.from(techSet)];
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
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedProject = null;
    document.body.style.overflow = '';
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
