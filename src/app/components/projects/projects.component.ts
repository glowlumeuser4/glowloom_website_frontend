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
  // Pre-load default projects immediately so there is no blank screen or loading blocker
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories: string[] = ['All'];
  selectedCategory = 'All';
  loading = false; // Set to false initially since we display default projects instantly
  error: string | null = null;
  
  // Lightbox Modal state
  selectedProject: Project | null = null;
  activeImageIndex = 0;

  defaultProjects: Project[] = [
    {
      id: 'p1',
      project_name: 'Dhriti Mart - Agricultural E-Commerce Platform',
      status: 'Ongoing',
      reference_images_for_image: ['assets/dhriti-mart.jpg', 'assets/company.jpg'],
      full_description: 'Dhriti Mart is an agricultural e-commerce platform developed to create a simple, reliable, and convenient digital marketplace for agricultural products. The platform is designed to connect customers directly with a dedicated range of agricultural products through a modern online shopping experience. Unlike a traditional multi-vendor marketplace, Dhriti Mart focuses on connecting manufacturers, vendors, and customers on a single platform, giving the business greater control over product quality, pricing, inventory, customer experience, and order fulfillment. The platform provides customers with an easy way to discover products, view detailed product information, add products to their cart, place orders, and manage their purchases through a user-friendly interface. From the business side, Dhriti Mart is designed with an administrative management system that helps manage products, categories, inventory, orders, customers, pricing, and other important aspects of the e-commerce operation. CHANDHU Technologies provides complete development and maintenance of the Dhriti Mart application. The technical team provides support for administrative operations, including connecting vendors and manufacturers, managing customers, updating documents, and handling other technical requirements. CHANDHU Technologies also provides call support for Dhriti Mart.',
      applications: 'Agricultural E-Commerce Marketplace, Vendor & Manufacturer Connectivity, Direct Customer Order Fulfillment, Admin Management Dashboard, Call & Technical Support',
      technologies_used: 'Angular, TypeScript, Node.js, Express, PostgreSQL, Redis, REST APIs'
    },
    {
      id: 'p2',
      project_name: 'Hospital Staff & Workforce Management System',
      status: 'Completed',
      reference_images_for_image: ['assets/web-solution.jpg', 'assets/company.jpg'],
      full_description: 'Comprehensive enterprise hospital management platform integrating real-time staff biometrics, patient triage tracking, EHR medical records, pharmacy inventory, and automated billing workflows.',
      applications: 'Hospital Administration, Biometric Attendance Tracking, Electronic Health Records (EHR), Medical Billing',
      technologies_used: 'Angular, TypeScript, Node.js, Express, PostgreSQL, Redis'
    },
    {
      id: 'p3',
      project_name: 'CropCure AI - Crop Health & Advisory Platform',
      status: 'Upcoming',
      reference_images_for_image: ['assets/cropcure-ai.jpg', 'assets/ai-solution-dashboard.jpg'],
      full_description: 'CropCure AI is an upcoming AI-powered crop health diagnosis and advisory platform designed to help farmers identify and manage crop health problems quickly and effectively. By simply capturing a photograph of a crop, leaf, fruit, or other plant part, CropCure AI will use artificial intelligence to identify the crop and detect potential diseases, pest attacks, or nutrient deficiencies, along with an assessment of the severity of the problem. Based on the AI analysis, the platform will provide relevant Package of Practices, including cultural, preventive, biological, and other suitable management methods. It will then recommend the most appropriate intervention—such as a fungicide/pesticide, insecticide, or nutrient/fertilizer—based on the identified problem, with options for organic or inorganic solutions where applicable. Farmers will also be able to access product recommendations, application guidance, nearby agricultural shops, location-based availability, weather-based advisories, and expert consultation. CropCure AI aims to combine artificial intelligence with practical agricultural knowledge to provide farmers with a simple, accessible, and reliable digital solution for better crop health management and informed decision-making.',
      applications: 'AI Crop Disease Diagnosis, Leaf & Fruit Photo Analysis, Package of Practices Advisory, Organic/Inorganic Treatment Guidance, Nearby Agri Shop Locator, Weather Advisories',
      technologies_used: 'Python, PyTorch, Computer Vision, Deep Neural Networks, FastAPI, Angular, Cloud AI'
    },
    {
      id: 'p4',
      project_name: 'AI Natural Disaster Prediction System',
      status: 'Completed',
      reference_images_for_image: ['assets/disaster-ai.jpg', 'assets/dev-workspace-3d.jpg'],
      full_description: 'An advanced machine learning platform that analyzes satellite telemetry, atmospheric pressure, and historical precipitation data to forecast flood patterns and natural disasters with 94.2% predictive accuracy.',
      applications: 'Early Warning Alert System, Government Disaster Response, Urban Drainage Infrastructure',
      technologies_used: 'Python, PyTorch, TensorFlow, Angular, PostgreSQL, FastAPI'
    },
    {
      id: 'p5',
      project_name: 'AI-Based Stock Market Price Prediction System',
      status: 'Completed',
      reference_images_for_image: ['assets/stock-ai-candlestick.jpg'],
      full_description: 'High-frequency stock prediction system leveraging neural networks and sentiment analysis of financial news streams to deliver real-time trade signals and risk metrics.',
      applications: 'Algorithmic Trading, Financial Risk Analytics, Portfolio Optimization',
      technologies_used: 'Python, Scikit-learn, React, FastAPI, WebSockets, Redis'
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // 1. Instantly render the default projects and set up initial categories
    this.projects = [...this.defaultProjects];
    this.filteredProjects = [...this.defaultProjects];
    this.generateCategories();

    // 2. Fetch fresh data from backend database in the background
    this.fetchProjects();
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

  fetchProjects(): void {
    // We don't set loading = true anymore to prevent blocking the screen
    this.apiService.getProjects().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          // Merge database items, mapping them with corresponding asset images
          this.projects = data.map(p => {
            const pName = p.project_name.toLowerCase();
            let matchedLocal: Project | undefined;
            
            if (pName.includes('mart')) {
              matchedLocal = this.defaultProjects[0];
            } else if (pName.includes('hospital') || pName.includes('staff')) {
              matchedLocal = this.defaultProjects[1];
            } else if (pName.includes('cropcure') || pName.includes('crop')) {
              matchedLocal = this.defaultProjects[2];
            } else if (pName.includes('disaster') || pName.includes('natural')) {
              matchedLocal = this.defaultProjects[3];
            } else if (pName.includes('stock') || pName.includes('trade') || pName.includes('market') || pName.includes('price')) {
              matchedLocal = this.defaultProjects[4];
            }
            
            return {
              ...p,
              project_name: matchedLocal?.project_name || p.project_name,
              status: p.status || matchedLocal?.status || 'Completed',
              reference_images_for_image: matchedLocal?.reference_images_for_image || ['assets/stock-ai-candlestick.jpg'],
              full_description: matchedLocal?.full_description || p.full_description,
              applications: matchedLocal?.applications || p.applications,
              technologies_used: p.technologies_used || matchedLocal?.technologies_used || ''
            };
          });
          
          // Re-generate categories dynamically based on the latest database items
          this.generateCategories();
          
          // Apply current active category filter to the fresh list
          this.filterCategory(this.selectedCategory);
        }
      },
      error: (err) => {
        console.warn('API connection slow/offline - using preloaded project records.', err);
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
