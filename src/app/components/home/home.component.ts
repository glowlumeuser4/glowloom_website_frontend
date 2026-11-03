import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

export interface ProjectRecord {
  id: number;
  project_name: string;
  full_description: string;
  technologies_used: string;
  applications: string;
  reference_images_for_image: string[];
}

export interface DevStep {
  id: number;
  phase: string;
  title: string;
  badge: string;
  icon: string;
  description: string;
  codeSnippet: string;
  highlights: string[];
  metrics: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  description: string;
  techStack: string[];
  keyFeatures: string[];
  impactMetric: string;
  imageSrc: string;
}




export interface SubProjectItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  tagline: string;
  organization: string;
  websiteUrl?: string;
  websiteLabel?: string;
  overview: string[];
  keyFeatures: { title: string; desc: string }[];
  vision: string;
  footerNote: string;
  images: string[];
  imageCaptions?: string[];
}

export interface DomainProjectDetail {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  organization: string;
  websiteUrl?: string;
  websiteLabel?: string;
  overview: string[];
  keyFeatures: { title: string; desc: string }[];
  vision: string;
  footerNote: string;
  images: string[];
  imageCaptions?: string[];
  subProjects?: SubProjectItem[];
}

export interface ProjectDomain {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  accentColor: string;
  badge: string;
  exampleProjects: string;
}


export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  domain: string;
  domainBadgeColor: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  role: string;
  title: string;
  photoUrl?: string;
  icon?: string;
  iconClass?: string;
  badge?: string;
  description: string;
  skills: string[];
}

interface Node3D {
  x: number;
  y: number;
  z: number;
  label: string;
  icon: string;
  color: string;
  size: number;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
  life: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('heroDevCanvas3d') canvasRef!: ElementRef<HTMLCanvasElement>;

  activeStepIndex = 0;
  autoPlayInterval: any;

  // 3D Canvas State
  private ctx!: CanvasRenderingContext2D;
  private animFrameId: any;
  private rotationAngle = 0;
  mouseX = 0;
  mouseY = 0;
  targetMouseX = 0;
  targetMouseY = 0;
  active3dStatus = 'DEVELOPMENT AUTOMATION LIVE';

  nodes3D: Node3D[] = [
    { x: 0, y: -90, z: 0, label: 'AI Brain Core', icon: '🧠', color: '#f59e0b', size: 24 },
    { x: -110, y: 0, z: 60, label: 'Fullstack API', icon: '⚡', color: '#6366f1', size: 20 },
    { x: 110, y: 0, z: -60, label: 'Cloud Pods', icon: '☁️', color: '#06b6d4', size: 20 },
    { x: -70, y: 90, z: -80, label: 'Distributed DB', icon: '🗄️', color: '#ec4899', size: 18 },
    { x: 70, y: 90, z: 80, label: 'Mobile Hub', icon: '📱', color: '#10b981', size: 18 }
  ];

  particles3D: Particle3D[] = [];

  devSteps: DevStep[] = [
    {
      id: 1,
      phase: 'STAGE 01',
      title: 'AI Blueprint & Architecture',
      badge: 'System Design',
      icon: '🧠',
      description: 'We map core requirements, database schemas, and AI algorithm pipelines into high-concurrency microservices blueprints before writing code.',
      codeSnippet: `// CHANDHU Technologies Architecture Init\ninterface SystemArchitecture {\n  database: 'PostgreSQL Distributed';\n  backend: 'Node.js Microservices';\n  aiEngine: 'PyTorch / TensorRT';\n  scaling: 'Auto-K8s Cluster';\n}`,
      highlights: ['Scalable Schema Design', 'AI Algorithm Selection', 'Security Blueprint Audit'],
      metrics: 'Zero Bottleneck Guarantee'
    },
    {
      id: 2,
      phase: 'STAGE 02',
      title: 'Full-Stack Development & AI Logic',
      badge: 'Production Coding',
      icon: '⚡',
      description: 'Our senior engineers code high-performance APIs, responsive Angular/React web portals, and native mobile apps integrated with trained AI models.',
      codeSnippet: `// High-Speed API Response\nexport async function processAiTask(payload) {\n  const token = await authGuard.verify(payload);\n  const modelOutput = await aiEngine.infer(payload.data);\n  return { status: 200, output: modelOutput, latency: '12ms' };\n}`,
      highlights: ['Strict Type Safety', 'Sub-50ms API Latency', 'Modular Clean Code'],
      metrics: '< 50ms API Latency'
    },
    {
      id: 3,
      phase: 'STAGE 03',
      title: 'Automated Testing & Security Audit',
      badge: 'QA & Compliance',
      icon: '🛡️',
      description: 'Every code commit undergoes rigorous automated unit tests, end-to-end user journey simulations, load stress testing, and security checks.',
      codeSnippet: `// Automated QA Pipeline Pass\n✔ Unit Test Coverage: 98.4%\n✔ Penetration Audit: PASSED (0 Vulnerabilities)\n✔ Stress Benchmark: 10,000 req/sec sustained`,
      highlights: ['98%+ Code Coverage', 'Penetration Tested', 'OWASP Security Compliant'],
      metrics: '99.99% Reliability Score'
    },
    {
      id: 4,
      phase: 'STAGE 04',
      title: 'CI/CD Cloud Deployment',
      badge: 'DevOps Automation',
      icon: '☁️',
      description: 'Automated deployment pipelines compile containerized builds to global Kubernetes clusters (AWS/Azure/GCP) with zero downtime.',
      codeSnippet: `// Kubernetes Deployment Status\nkubectl get pods --namespace=production\n> chandhu-api-v2-7f98b: Running (Ready: 10/10)\n> chandhu-db-cluster: Healthy (Replicas: 3)`,
      highlights: ['Zero-Downtime Releases', 'Global CDN Caching', 'Automated Failover'],
      metrics: '100% Zero-Downtime'
    },
    {
      id: 5,
      phase: 'STAGE 05',
      title: 'Continuous Scaling & Telemetry',
      badge: 'Enterprise Growth',
      icon: '🚀',
      description: 'Real-time telemetry and APM monitoring track user performance, auto-scaling server pods dynamically as user load surges.',
      codeSnippet: `// Real-Time System Telemetry\n[LIVE METRICS]\nCPU Utilization: 24% | Memory: 1.2GB / 8GB\nActive Users: 45,210 | System Health: EXCELLENT`,
      highlights: ['24/7 APM Monitoring', 'Auto-Scaling Infrastructure', 'Continuous Feature Updates'],
      metrics: '24/7 Live Telemetry'
    }
  ];

  activeSolutionId = 'ai';

  // Domain Project Details State
  selectedDomainDetail: DomainProjectDetail | null = null;
  activeDomainImageIndex = 0;
  activeSubProjectIndex = 0;

  get currentSubProject(): SubProjectItem | DomainProjectDetail {
    if (this.selectedDomainDetail?.subProjects && this.selectedDomainDetail.subProjects.length > 0) {
      return this.selectedDomainDetail.subProjects[this.activeSubProjectIndex] || this.selectedDomainDetail.subProjects[0];
    }
    return this.selectedDomainDetail!;
  }

  switchSubProject(index: number): void {
    this.activeSubProjectIndex = index;
    this.activeDomainImageIndex = 0;
  }


    domainDetailsMap: { [key: string]: DomainProjectDetail } = {
    agriculture: {
      id: 'agriculture',
      title: 'Dhriti Mart – Digital Agriculture Marketplace',
      badge: '🌾 AgriTech & Smart Farming',
      tagline: 'Empowering Agriculture Through Technology',
      organization: 'A Project by Chandhu Tech',
      overview: [
        'Dhriti Mart is an agriculture-focused digital marketplace designed to simplify the way businesses purchase and manage agricultural products. With a primary focus on B2B commerce, the platform provides a streamlined digital experience for agricultural product sales, including fertilizers and other farming essentials.',
        'Developed by Chandhu Tech, Dhriti Mart aims to make agricultural commerce more organized, accessible, and efficient through technology. The platform focuses on simplifying product discovery, improving order management, and supporting smoother business operations.',
        'Designed with future growth in mind, Dhriti Mart has the potential to expand into B2C commerce, connecting directly with individual farmers and a wider customer base.'
      ],
      keyFeatures: [
        { title: 'B2B Marketplace', desc: 'A digital platform for agricultural product procurement.' },
        { title: 'Product Management', desc: 'Organized management and presentation of agricultural products.' },
        { title: 'Order Management', desc: 'Structured workflows for handling business orders.' },
        { title: 'User-Friendly Experience', desc: 'Simple and accessible product discovery and purchasing.' },
        { title: 'Scalable Architecture', desc: 'A foundation for future business growth and B2C expansion.' }
      ],
      vision: 'To modernize agricultural commerce by combining technology, accessibility, and efficient business processes into one digital ecosystem.',
      footerNote: 'Dhriti Mart — Empowering Agriculture Through Technology. Conceptualized and developed by Chandhu Tech.',
      images: [
        'assets/dhriti-mart-offer.png',
        'assets/dhriti-mart-smart-tools.png',
        'assets/dhriti-mart-organic.png'
      ]
    },
    travel: {
      id: 'travel',
      title: 'Gokarna Rentals – Travel & Rental Booking Platform',
      badge: '✈️ Tourism & Travel Systems',
      tagline: 'Explore More, Worry Less • Designed & Developed by Chandhu Tech',
      organization: 'A Project by Chandhu Tech',
      websiteUrl: 'https://gokaranarentals.com',
      websiteLabel: 'Gokaranarentals.com',
      overview: [
        'Gokarna Rentals is an online booking platform designed to make exploring Gokarna easier and more convenient for travelers. The platform brings together bike and scooter rentals, accommodation bookings, and boating experiences in one place, helping users plan their trips with ease.',
        'Developed by Chandhu Tech, Gokarna Rentals transforms traditional rental services into a digital booking experience, allowing travelers to explore available services and plan their experiences more conveniently.',
        'The platform focuses on simplifying the travel planning process, improving booking accessibility, and creating a seamless experience for visitors exploring Gokarna.'
      ],
      keyFeatures: [
        { title: 'Bike & Scooter Rentals', desc: 'Convenient online booking for two-wheelers.' },
        { title: 'Accommodation Booking', desc: 'Explore and book rooms and stays.' },
        { title: 'Boating Experiences', desc: 'Access boating options for memorable travel experiences.' },
        { title: 'Combined Packages', desc: 'Options to combine rentals, stays, and boating into one experience.' },
        { title: 'Online Booking', desc: 'A centralized platform for convenient trip planning.' },
        { title: 'Advance Payments', desc: 'A structured advance-payment process to support reservations.' }
      ],
      vision: 'To simplify travel experiences through technology by bringing essential rental and tourism services together on one convenient digital platform.',
      footerNote: 'Gokarna Rentals — Explore More, Worry Less. Designed and developed by Chandhu Tech.',
      images: [
        'assets/mobile-solution.jpg',
        'assets/web-solution.jpg'
      ]
    },
    construction: {
      id: 'construction',
      title: 'Construction Business & Management Systems',
      badge: '🏗️ Construction & Architecture',
      tagline: 'Building Smarter. Managing Better. • A Project by Chandhu Tech',
      organization: 'A Project by Chandhu Tech',
      overview: [],
      keyFeatures: [],
      vision: '',
      footerNote: 'Designed and developed by Chandhu Tech.',
      images: [
        'assets/buildpro-construction-crm.jpg'
      ],
      subProjects: [
        {
          id: 'crm',
          title: 'Construction CRM – Construction Management & Business Operations System',
          subtitle: 'A Project by Chandhu Tech',
          badge: '🏗️ Construction CRM (BuildPro)',
          tagline: 'Building Smarter. Managing Better.',
          organization: 'A Project by Chandhu Tech',
          overview: [
            'The Construction CRM is a centralized digital solution designed to help construction companies manage client enquiries, projects, site activities, and workforce operations through a single platform.',
            'Developed by Chandhu Tech, the system helps construction businesses organize their sales pipeline, maintain client information, track project progress, schedule site visits, and manage daily tasks. It provides a structured way to monitor ongoing projects and coordinate activities between office teams and on-site personnel.',
            'By bringing essential business workflows into one system, the platform aims to reduce manual administration, improve project visibility, and support efficient decision-making.'
          ],
          keyFeatures: [
            { title: 'Lead & Enquiry Management', desc: 'Track potential clients, incoming enquiries, and follow-ups.' },
            { title: 'Client Management', desc: 'Maintain organized client details and communication records.' },
            { title: 'Project Management', desc: 'Monitor ongoing, completed, and planned construction projects.' },
            { title: 'Site Visit Scheduling', desc: 'Organize site inspections, client visits, and appointments.' },
            { title: 'Task Management', desc: 'Assign tasks and track their completion.' },
            { title: 'Team & Attendance Management', desc: 'Maintain employee records and monitor attendance.' },
            { title: 'Project Status Tracking', desc: 'View project progress and identify pending activities.' },
            { title: 'Dashboard & Reports', desc: 'Access business summaries, project statistics, and operational insights.' }
          ],
          vision: 'To simplify construction business operations through technology, enabling companies to manage projects, coordinate teams, and build stronger client relationships through one organized digital platform.',
          footerNote: 'Building Smarter. Managing Better. Designed and developed by Chandhu Tech.',
          images: [
            'assets/buildpro-construction-crm.jpg'
          ]
        },
        {
          id: 'website',
          title: 'Construction Company Website – Digital Business Platform',
          subtitle: 'A Project by Chandhu Tech',
          badge: '🏢 Company Website Platform',
          tagline: 'Building Digital Foundations for Construction Businesses',
          organization: 'A Project by Chandhu Tech',
          overview: [
            'The Construction Company Website is a digital platform designed to establish a strong online presence for a construction business. The website showcases the company’s services, projects, expertise, and capabilities, helping potential clients understand its work and build confidence in its offerings.',
            'Developed by Chandhu Tech, the platform focuses on presenting construction services through a professional and user-friendly digital experience. It enables visitors to explore completed and ongoing projects, learn about the company’s capabilities, and connect with the team for business enquiries.',
            'The website aims to strengthen the company’s digital identity, improve service visibility, and create new opportunities to connect with prospective clients.'
          ],
          keyFeatures: [
            { title: 'Company Profile', desc: 'A professional overview of the company’s background, expertise, and capabilities.' },
            { title: 'Services Showcase', desc: 'Clear presentation of construction services and solutions.' },
            { title: 'Project Portfolio', desc: 'Display of completed and ongoing construction projects.' },
            { title: 'Enquiry Management', desc: 'Convenient ways for potential clients to contact the company.' },
            { title: 'Responsive Design', desc: 'An accessible browsing experience across mobile, tablet, and desktop devices.' },
            { title: 'Digital Brand Presence', desc: 'A professional online identity that builds credibility and visibility.' }
          ],
          vision: 'To empower construction businesses with a professional digital presence that showcases their expertise, builds trust, and connects them with new opportunities.',
          footerNote: 'Building Digital Foundations for Construction Businesses. Designed and developed by Chandhu Tech.',
          images: [
            'assets/web-solution.jpg',
            'assets/dev-workspace-3d.jpg'
          ]
        }
      ]
    },
    healthcare: {
      id: 'healthcare',
      title: 'Hospital CRM – Hospital Operations & Management System',
      badge: '🏥 HealthTech & Hospital CRM',
      tagline: 'Smarter Hospital Operations. Better Healthcare Management.',
      organization: 'A Project by Chandhu Tech',
      overview: [
        'The Hospital CRM is a centralized hospital management solution designed to streamline daily hospital operations, monitor doctor and staff attendance, and maintain organized patient treatment records.',
        'Developed by Chandhu Tech, the system enables hospitals to track patient enquiries, manage appointments, record doctor consultations, monitor staff attendance, and maintain detailed records of patients treated by individual doctors. It also provides visibility into the number of patients attended by each doctor and staff members assigned to patient rooms.',
        'By bringing essential hospital workflows into one digital platform, the system helps improve operational transparency, simplify record management, and support better coordination between doctors, staff, and hospital administration.'
      ],
      keyFeatures: [
        { title: 'Patient Enquiry Management', desc: 'Record and track patient enquiries.' },
        { title: 'Appointment Management', desc: 'Organize patient appointments and consultation schedules.' },
        { title: 'Doctor Attendance', desc: 'Monitor doctor attendance and availability.' },
        { title: 'Staff Attendance', desc: 'Track hospital staff attendance and working schedules.' },
        { title: 'Patient Treatment Records', desc: 'Maintain records of patients treated by doctors.' },
        { title: 'Doctor-wise Patient History', desc: 'Access treatment records associated with a particular doctor.' },
        { title: 'Doctor Performance Tracking', desc: 'View the number of patients attended by each doctor.' },
        { title: 'Room-wise Staff Monitoring', desc: 'Track staff assigned to rooms and their attendance to patients.' },
        { title: 'Centralized Records', desc: 'Keep essential patient and operational information organized in one system.' },
        { title: 'Administrative Reporting', desc: 'Support hospital management with attendance summaries, patient statistics, and operational reports.' }
      ],
      vision: 'To simplify hospital administration through technology by providing a centralised platform that improves operational visibility, supports efficient staff coordination, and organises patient care records.',
      footerNote: 'Smarter Hospital Operations. Better Healthcare Management. Designed and developed by Chandhu Tech.',
      images: [
        'assets/hospital-crm-dashboard.png',
        'assets/hospital-crm-enquiries.png',
        'assets/hospital-crm-doctor-records.png',
        'assets/hospital-crm-staff-allocation.png'
      ],
      imageCaptions: [
        'Hospital CRM — Operations Dashboard',
        'Hospital CRM — Patient Enquiries Management',
        'Hospital CRM — Doctor-wise Patient Treatment Records',
        'Hospital CRM — Staff Attendance & Room Allocation'
      ]
    }
  };

  openDomainModal(domain: ProjectDomain): void {
    if (this.domainDetailsMap[domain.id]) {
      this.selectedDomainDetail = this.domainDetailsMap[domain.id];
      this.activeDomainImageIndex = 0;
      this.activeSubProjectIndex = 0;
      document.body.style.overflow = 'hidden';
    }
  }

  closeDomainModal(): void {
    this.selectedDomainDetail = null;
    document.body.style.overflow = '';
  }

  nextDomainImage(event: Event): void {
    event.stopPropagation();
    const cur = this.currentSubProject;
    if (cur && cur.images && cur.images.length > 1) {
      this.activeDomainImageIndex = (this.activeDomainImageIndex + 1) % cur.images.length;
    }
  }

  prevDomainImage(event: Event): void {
    event.stopPropagation();
    const cur = this.currentSubProject;
    if (cur && cur.images && cur.images.length > 1) {
      this.activeDomainImageIndex = (this.activeDomainImageIndex - 1 + cur.images.length) % cur.images.length;
    }
  }

  selectDomainImage(index: number, event: Event): void {
    event.stopPropagation();
    this.activeDomainImageIndex = index;
  }


  // Project Domains (Agriculture, Tours & Travels, Healthcare, Constructions)
  projectDomains: ProjectDomain[] = [
    {
      id: 'agriculture',
      name: 'Agriculture',
      icon: '🌾',
      tagline: 'AgriTech & Smart Farming',
      description: 'Crop health diagnostics, agricultural supply-chain e-commerce, real-time farm telemetry & farmer advisory platforms.',
      accentColor: '#10b981',
      badge: 'AgriTech',
      exampleProjects: 'Dhriti Mart • CropCure AI'
    },
    {
      id: 'travel',
      name: 'Tours and Travels',
      icon: '✈️',
      tagline: 'Tourism & Travel Systems',
      description: 'Dynamic tour package bookings, real-time travel telemetry, ticketing gateways, hotel reservation & GPS itineraries.',
      accentColor: '#0ea5e9',
      badge: 'TravelTech',
      exampleProjects: 'Gokarna Rentals • Takeatrip'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: '🏥',
      tagline: 'HealthTech & MedTech',
      description: 'Hospital staff workforce management, patient electronic health records (EHR), biometric verification & doctor appointments.',
      accentColor: '#f43f5e',
      badge: 'MedTech',
      exampleProjects: 'Hospital CRM • Operations & Staff Portal'
    },
    {
      id: 'construction',
      name: 'Constructions',
      icon: '🏗️',
      tagline: 'Construction & Architecture',
      description: 'Architectural enterprise platforms, material quantity takeoff estimation, contractor management & job-site monitoring.',
      accentColor: '#f59e0b',
      badge: 'BuildTech',
      exampleProjects: 'Construction CRM (BuildPro) • Company Website'
    }
  ];


  // Contact Form State
  formData = {
    user_first_name: '',
    user_last_name: '',
    user_email_id: '',
    user_contact_number: '',
    purpouse_of_contact: ''
  };
  submitting = false;
  successMessage = '';
  errorMessage = '';

  // Team & Management State
  selectedMember: MemberProfile | null = null;

    // Client Testimonials
  testimonials: TestimonialItem[] = [
    {
      id: 1,
      name: 'Dhriti Mart Team',
      role: 'Agri-Business Founder',
      company: 'Dhriti Mart',
      avatar: '🌾',
      rating: 5,
      quote: 'Chandhu Tech understood our vision and transformed it into a practical digital platform for our agricultural business. We appreciate their dedication, professionalism, and commitment to delivering a quality solution for Dhriti Mart.',
      domain: 'Agriculture & AgriTech',
      domainBadgeColor: '#10b981'
    },
    {
      id: 2,
      name: 'Gokarna Rentals Team',
      role: 'Fleet & Tourism Operations',
      company: 'Gokarna Rentals',
      avatar: '🏖️',
      rating: 5,
      quote: 'Working with Chandhu Tech has been a great experience. They transformed our traditional rental business into a convenient online booking platform. We appreciate their dedication, professional approach, and commitment to bringing Gokarna Rentals online.',
      domain: 'Tours & Vehicle Rentals',
      domainBadgeColor: '#0ea5e9'
    },
    {
      id: 3,
      name: 'Healthcare Administration',
      role: 'Hospital Operations Director',
      company: 'Apex Health Systems',
      avatar: '🏥',
      rating: 5,
      quote: 'We appreciate Chandhu Tech for their professionalism, dedication, and quality of work. Their team has been supportive throughout the process, and we are happy with their commitment and approach.',
      domain: 'Healthcare & Workforce',
      domainBadgeColor: '#f43f5e'
    },
    {
      id: 4,
      name: 'Enterprise Cloud Labs',
      role: 'Head of Digital Transformation',
      company: 'Nova Enterprise Solutions',
      avatar: '🚀',
      rating: 5,
      quote: 'Working with Chandhu Tech has been a positive experience. Their professionalism, innovative approach, and commitment to quality truly stand out. We appreciate their dedication and look forward to working together on future projects.',
      domain: 'AI & Enterprise Software',
      domainBadgeColor: '#8b5cf6'
    }
  ];


  managementList: MemberProfile[] = [
    {
      id: 'chandhu',
      name: 'Chandrakanth Jain',
      role: 'CEO & Director',
      title: 'Application Designer & Architect',
      photoUrl: 'assets/chandhu.jpg',
      iconClass: 'founder-box',
      badge: 'Leadership',
      description: 'Visionary technology leader specializing in enterprise AI system design, cloud architecture, and high-concurrency digital platform development.',
      skills: ['System Architecture', 'AI Product Design', 'Full-Stack Engineering', 'Cloud Solutions']
    },
    {
      id: 'bharat',
      name: 'Bharat.P.R.',
      role: 'Co-Founder',
      title: 'Backend Developer & Engineer',
      photoUrl: 'assets/bharat.jpg',
      iconClass: 'cofounder-box',
      badge: 'Leadership',
      description: 'Senior backend architect leading core API infrastructure, high-throughput microservices, and database performance optimization.',
      skills: ['Microservices', 'Node.js & Python APIs', 'Distributed DBs', 'DevOps & Security']
    }
  ];

  teamList: MemberProfile[] = [
    {
      id: 'swaraj',
      name: 'Swaraj.Gowda',
      role: 'Backend Developer',
      title: 'Database Designer',
      photoUrl: 'assets/swaraj.jpg',
      iconClass: 'db-box',
      description: 'Database architecture specialist designing relational and NoSQL schemas for zero data-loss and sub-millisecond query performance.',
      skills: ['PostgreSQL & MongoDB', 'Query Optimization', 'Schema Architecture', 'Data Migration']
    },
    {
      id: 'bhavesh',
      name: 'Bhavesh',
      role: 'Backend Developer',
      title: 'AI Engineer',
      photoUrl: 'assets/bhavesh.jpeg',
      iconClass: 'ai-box',
      description: 'AI logic engineer developing custom machine learning pipelines, NLP automation models, and real-time predictive analytics.',
      skills: ['PyTorch & TensorFlow', 'Machine Learning', 'FastAPI', 'Neural Networks']
    },
    {
      id: 'bindhushree',
      name: 'Bindhushree.K.B.',
      role: 'Frontend Developer',
      title: 'UI/UX & Web Engineer',
      photoUrl: 'assets/bindhushree.png',
      iconClass: 'ui-box',
      description: 'Creative frontend developer crafting sleek, accessible, user-centered web applications and modern responsive interfaces.',
      skills: ['Frontend Architecture', 'UI/UX Design', 'CSS3 & Glassmorphism', 'Responsive Design']
    },
    {
      id: 'sanket',
      name: 'Sanket.Manovli',
      role: 'Backend Developer',
      title: 'Full Stack Developer',
      photoUrl: 'assets/sanket.jpg',
      iconClass: 'fullstack-box',
      description: 'Versatile full-stack engineer building end-to-end web platforms, secure auth gateways, and high-performance server APIs.',
      skills: ['Full-Stack Systems', 'REST & GraphQL APIs', 'State Management', 'Enterprise Security']
    },
    {
      id: 'harsha',
      name: 'Harsha.Mantrodi',
      role: 'Frontend Developer',
      title: 'AI/ML & Cloud Engineer',
      photoUrl: 'assets/harsha.jpg',
      iconClass: 'cloud-box',
      description: 'Frontend specialist and cloud engineer crafting responsive user dashboards and automated CI/CD containerized deployment pipelines.',
      skills: ['AI Web Apps', 'Docker & Kubernetes', 'Cloud DevOps', 'Responsive UI/UX']
    }
  ];

  openMemberModal(member: MemberProfile): void {
    this.selectedMember = member;
    document.body.style.overflow = 'hidden';
  }

  closeMemberModal(): void {
    this.selectedMember = null;
    document.body.style.overflow = '';
  }

  // Featured Projects State
  projectsList: ProjectRecord[] = [
    {
      id: 1,
      project_name: 'Natural Disaster Detection System',
      full_description: 'A machine learning platform predicting floods and extreme weather disasters using satellite telemetry and environmental data streams.',
      technologies_used: 'Python, PyTorch, PostgreSQL, Angular, AWS',
      applications: 'Disaster Management, Emergency Response, Smart Cities',
      reference_images_for_image: ['assets/ai-solution-dashboard.jpg', 'assets/dev-workspace-3d.jpg']
    },
    {
      id: 2,
      project_name: 'Hospital Management & Biometric Portal',
      full_description: 'Healthcare administration platform managing staff attendance, patient treatment records, appointment schedules, and biometric verification.',
      technologies_used: 'Angular, Node.js, Express, MongoDB, Biometric SDK',
      applications: 'Healthcare Administration, Patient Care, Workforce Tracking',
      reference_images_for_image: ['assets/web-solution.jpg', 'assets/company.jpg']
    },
    {
      id: 3,
      project_name: 'AI Stock Market Predictive Analytics',
      full_description: 'Financial analytics platform providing real-time stock buy/sell indicators and predictive market trend analysis.',
      technologies_used: 'Python, FastAPI, Angular, Redis, PyTorch, Kubernetes',
      applications: 'FinTech, Algorithmic Analytics, Portfolio Management',
      reference_images_for_image: ['assets/db-solution.jpg', 'assets/mobile-solution.jpg']
    }
  ];
  selectedProject: ProjectRecord | null = null;
  activeImageIndex = 0;

  openLightbox(project: ProjectRecord) {
    this.selectedProject = project;
    this.activeImageIndex = 0;
  }

  closeLightbox() {
    this.selectedProject = null;
  }

  nextImage(event: Event) {
    event.stopPropagation();
    if (this.selectedProject) {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.selectedProject.reference_images_for_image.length;
    }
  }

  prevImage(event: Event) {
    event.stopPropagation();
    if (this.selectedProject) {
      this.activeImageIndex = (this.activeImageIndex - 1 + this.selectedProject.reference_images_for_image.length) % this.selectedProject.reference_images_for_image.length;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    setTimeout(() => {
      this.submitting = false;
      this.successMessage = 'Thank you! Your message has been sent successfully. Our team will contact you within 24 hours.';
      form.resetForm();
    }, 1200);
  }

  solutions: SolutionItem[] = [
    {
      id: 'ai',
      title: 'AI & Machine Learning Engineering',
      tagline: 'Transform raw business data into predictive intelligence',
      icon: '🤖',
      description: 'We design custom ML models, natural language processing pipelines, recommendation systems, and computer vision tools built to solve enterprise challenges.',
      techStack: ['Python', 'PyTorch', 'TensorFlow', 'OpenAI API', 'LangChain', 'FastAPI'],
      keyFeatures: ['Predictive Business Analytics', 'Custom LLM & RAG Integration', 'Automated Workflow AI Agents', 'Real-Time Data Pipelines'],
      impactMetric: '300% Operational Efficiency Boost',
      imageSrc: 'assets/ai-solution-dashboard.jpg'
    },
    {
      id: 'web',
      title: 'Enterprise Web Application Development',
      tagline: 'Blazing fast, secure, and modern web platforms',
      icon: '💻',
      description: 'Engineered with Angular, React, and Node.js. Built for high performance, maximum SEO optimization, and seamless user experiences on all devices.',
      techStack: ['Angular', 'TypeScript', 'Node.js', 'RxJS', 'Tailwind/CSS3', 'REST/GraphQL'],
      keyFeatures: ['Sub-Second Page Load Speed', 'Responsive Glassmorphic UI', 'Enterprise Role-Based Auth', 'Custom Dashboard Portals'],
      impactMetric: '99.9% Lighthouse Audit Score',
      imageSrc: 'assets/web-solution.jpg'
    },
    {
      id: 'mobile',
      title: 'Cross-Platform Mobile Ecosystems',
      tagline: 'High-performance mobile apps for iOS and Android',
      icon: '📱',
      description: 'Fluid, intuitive, and native-feeling mobile applications built for scale, biometric security, offline caching, and instant cloud sync.',
      techStack: ['Flutter', 'React Native', 'Android Native', 'iOS Swift', 'Firebase', 'SQLite'],
      keyFeatures: ['Native 60 FPS Performance', 'Offline-First Synchronization', 'Biometric & Secure Vault', 'Push Notification Engines'],
      impactMetric: '4.9 Star User Rating Standard',
      imageSrc: 'assets/mobile-solution.jpg'
    },
    {
      id: 'cloud',
      title: 'Cloud DevOps & Microservices',
      tagline: 'Resilient cloud infrastructure with zero downtime',
      icon: '☁️',
      description: 'Automated CI/CD pipelines, Kubernetes container orchestration, serverless microservices, and multi-region cloud deployment on AWS, Azure, or GCP.',
      techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Nginx'],
      keyFeatures: ['Zero-Downtime Deployment', 'Automated Auto-Scaling', 'Disaster Recovery Systems', 'Cost-Optimized Cloud Resources'],
      impactMetric: '99.99% Guaranteed SLA Uptime',
      imageSrc: 'assets/software-dev-process.jpg'
    },
    {
      id: 'database',
      title: 'Database Architecture & Data Engineering',
      tagline: 'Robust, high-throughput, and secure data storage',
      icon: '🗄️',
      description: 'Custom database design, SQL & NoSQL optimization, automated backup systems, high-availability clustering, and seamless data migrations.',
      techStack: ['PostgreSQL', 'MongoDB', 'Redis', 'ElasticSearch', 'MySQL', 'Prisma'],
      keyFeatures: ['Distributed High-Availability', 'Ultra-Fast Caching (Redis)', 'Automated Daily Backups', 'Zero Data Loss Guarantee'],
      impactMetric: '10x Faster Query Latency',
      imageSrc: 'assets/db-solution.jpg'
    }
  ];

  solutionAutoPlayInterval: any;

  ngOnInit() {
    this.startAutoPlay();
    this.startSolutionAutoPlay();
    this.initParticles();
  }

  ngAfterViewInit() {
    if (this.canvasRef) {
      this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
      this.resizeCanvas();
      this.render3DLoop();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    this.stopSolutionAutoPlay();
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  @HostListener('window:resize')
  resizeCanvas() {
    if (this.canvasRef && this.canvasRef.nativeElement.parentElement) {
      const parent = this.canvasRef.nativeElement.parentElement;
      this.canvasRef.nativeElement.width = parent.clientWidth || 500;
      this.canvasRef.nativeElement.height = parent.clientHeight || 450;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  private initParticles() {
    this.particles3D = [];
    for (let i = 0; i < 40; i++) {
      this.particles3D.push({
        x: (Math.random() - 0.5) * 250,
        y: (Math.random() - 0.5) * 250,
        z: (Math.random() - 0.5) * 250,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        vz: (Math.random() - 0.5) * 1.5,
        color: i % 2 === 0 ? '#6366f1' : '#f59e0b',
        life: Math.random() * 100
      });
    }
  }

  trigger3DAction(action: string) {
    if (action === 'ai') {
      this.active3dStatus = '🧠 AI NEURAL MODEL COMPILED & ACTIVE';
      this.burstParticles('#f59e0b');
    } else if (action === 'cloud') {
      this.active3dStatus = '☁️ KUBERNETES K8S PODS AUTO-SCALED';
      this.burstParticles('#06b6d4');
    } else if (action === 'security') {
      this.active3dStatus = '🛡️ OWASP ZERO-TRUST SECURITY AUDIT PASSED';
      this.burstParticles('#10b981');
    }
  }

  private burstParticles(color: string) {
    for (let i = 0; i < 25; i++) {
      this.particles3D.push({
        x: 0,
        y: 0,
        z: 0,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        vz: (Math.random() - 0.5) * 6,
        color: color,
        life: 120
      });
    }
  }

  // 60 FPS 3D WebGL Projection Canvas Loop
  private render3DLoop = () => {
    if (!this.ctx || !this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    this.ctx.clearRect(0, 0, width, height);

    // Smooth Mouse Interpolation
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    this.rotationAngle += 0.012;
    const angleY = this.rotationAngle + this.mouseX * 0.5;
    const angleX = this.mouseY * 0.4;

    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    // Project & Render 3D Software Developer Platform Grid
    const fov = 350;

    // Project 3D Nodes
    const projectedNodes = this.nodes3D.map(node => {
      // Y-axis rotation
      let x1 = node.x * cosY - node.z * sinY;
      let z1 = node.z * cosY + node.x * sinY;
      // X-axis rotation
      let y1 = node.y * cosX - z1 * sinX;
      let z2 = z1 * cosX + node.y * sinX;

      const scale = fov / (fov + z2 + 250);
      return {
        px: cx + x1 * scale,
        py: cy + y1 * scale,
        scale: scale,
        node: node
      };
    });

    // Draw Laser Connections between 3D Nodes
    this.ctx.lineWidth = 1.5;
    for (let i = 0; i < projectedNodes.length; i++) {
      for (let j = i + 1; j < projectedNodes.length; j++) {
        const n1 = projectedNodes[i];
        const n2 = projectedNodes[j];
        
        const grad = this.ctx.createLinearGradient(n1.px, n1.py, n2.px, n2.py);
        grad.addColorStop(0, n1.node.color);
        grad.addColorStop(1, n2.node.color);

        this.ctx.beginPath();
        this.ctx.strokeStyle = grad;
        this.ctx.globalAlpha = 0.4 * Math.min(n1.scale, n2.scale);
        this.ctx.moveTo(n1.px, n1.py);
        this.ctx.lineTo(n2.px, n2.py);
        this.ctx.stroke();
      }
    }
    this.ctx.globalAlpha = 1;

    // Draw Floating 3D Code Particles
    this.particles3D.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      p.life -= 0.5;

      if (p.life <= 0) {
        p.x = (Math.random() - 0.5) * 200;
        p.y = (Math.random() - 0.5) * 200;
        p.z = (Math.random() - 0.5) * 200;
        p.life = 100;
      }

      let x1 = p.x * cosY - p.z * sinY;
      let z1 = p.z * cosY + p.x * sinY;
      let y1 = p.y * cosX - z1 * sinX;
      let z2 = z1 * cosX + p.y * sinX;

      const scale = fov / (fov + z2 + 250);
      const px = cx + x1 * scale;
      const py = cy + y1 * scale;

      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(px, py, Math.max(1, 3 * scale), 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Render 3D Software Developer Central Hologram Base
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
    this.ctx.lineWidth = 2;
    this.ctx.ellipse(cx, cy + 60, 110 * cosX, 50 * cosX, 0, 0, Math.PI * 2);
    this.ctx.stroke();

    // Draw 3D Nodes
    projectedNodes.forEach(pn => {
      const radius = pn.node.size * pn.scale;
      
      // Outer Glow Circle
      this.ctx.beginPath();
      this.ctx.fillStyle = pn.node.color;
      this.ctx.globalAlpha = 0.25;
      this.ctx.arc(pn.px, pn.py, radius * 1.6, 0, Math.PI * 2);
      this.ctx.fill();

      // Solid Node Core
      this.ctx.globalAlpha = 1;
      this.ctx.beginPath();
      this.ctx.fillStyle = '#0f172a';
      this.ctx.strokeStyle = pn.node.color;
      this.ctx.lineWidth = 2.5;
      this.ctx.arc(pn.px, pn.py, radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      // Node Icon & Text
      this.ctx.font = `${Math.max(10, 14 * pn.scale)}px sans-serif`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(pn.node.icon, pn.px, pn.py);

      // Label Tag
      this.ctx.font = `bold ${Math.max(10, 12 * pn.scale)}px sans-serif`;
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillText(pn.node.label, pn.px, pn.py + radius + 14);
    });

    this.animFrameId = requestAnimationFrame(this.render3DLoop);
  };

  // Auto-play Software Development Lifecycle Stages (4-Second Auto-Rotate)
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.activeStepIndex = (this.activeStepIndex + 1) % this.devSteps.length;
    }, 4000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  selectStep(index: number) {
    this.activeStepIndex = index;
    this.startAutoPlay();
  }

  // Auto-play Intelligent Solutions Matrix (4-Second Auto-Rotate)
  startSolutionAutoPlay() {
    this.stopSolutionAutoPlay();
    this.solutionAutoPlayInterval = setInterval(() => {
      const solutionIds = this.solutions.map(s => s.id);
      const currentIndex = solutionIds.indexOf(this.activeSolutionId);
      const nextIndex = (currentIndex + 1) % solutionIds.length;
      this.activeSolutionId = solutionIds[nextIndex];
    }, 4000);
  }

  stopSolutionAutoPlay() {
    if (this.solutionAutoPlayInterval) {
      clearInterval(this.solutionAutoPlayInterval);
    }
  }

  selectSolution(id: string) {
    this.activeSolutionId = id;
    this.startSolutionAutoPlay();
  }

  get currentSolution(): SolutionItem {
    return this.solutions.find(s => s.id === this.activeSolutionId) || this.solutions[0];
  }
}
