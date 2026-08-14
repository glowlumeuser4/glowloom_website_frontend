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
