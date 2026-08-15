import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  selectedMember: MemberProfile | null = null;

  managementList: MemberProfile[] = [
    {
      id: 'chandhu',
      name: 'Chandhu.V',
      role: 'Founder & CEO',
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
      name: 'Sanketh.Manoli',
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
    },
   
  ];

  openMemberModal(member: MemberProfile) {
    this.selectedMember = member;
  }

  closeMemberModal() {
    this.selectedMember = null;
  }
}
