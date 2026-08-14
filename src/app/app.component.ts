import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  isMobileMenuOpen = false;
  isQuickMenuOpen = false;
  
  // WhatsApp Configuration (Pure International Digits format without +, -, or spaces)
  whatsappNumber = '917204734463';
  whatsappMessage = 'Hello CHANDHU Technologies! I visited your website and would like to connect.';

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleQuickMenu() {
    this.isQuickMenuOpen = !this.isQuickMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    this.closeMobileMenu();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/#' + sectionId;
    }
  }

  get whatsappLink(): string {
    const cleanDigits = (this.whatsappNumber || '').replace(/\D/g, '');
    return `https://api.whatsapp.com/send?phone=${cleanDigits}&text=${encodeURIComponent(this.whatsappMessage)}`;
  }

  openWhatsApp(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const cleanDigits = (this.whatsappNumber || '').replace(/\D/g, '');
    const msg = encodeURIComponent(this.whatsappMessage);
    
    // api.whatsapp.com/send is universally registered in iOS Universal Links & Android Intents
    const targetUrl = `https://api.whatsapp.com/send?phone=${cleanDigits}&text=${msg}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }
}
