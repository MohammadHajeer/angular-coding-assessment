import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  NavigationEnd,
  Router,
} from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { dashboardLinks } from '../constants';
import { GsapAnimationsService } from '../services/gsap/gsap-animations.service';
import { MobileNavComponent } from '../components/mobile-nav/mobile-nav.component';
import { CommonModule } from '@angular/common';
import { auth } from '../config/firebaseConfig';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarComponent,
    MobileNavComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  router = inject(Router);
  route = signal(dashboardLinks[0]);
  title = computed(() => ({
    name: this.route().name,
    description: this.route().description,
  }));
  gsapAnimations = inject(GsapAnimationsService);
  showMobileNav = false;

  @ViewChild('titleHeading', { static: false }) titleHeading!: ElementRef;

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const path = event.urlAfterRedirects;
        const route = dashboardLinks.find((link) => link.path === path)!;
        this.route.set(route);
        if (this.titleHeading?.nativeElement) {
          this.gsapAnimations.showTitle(this.titleHeading.nativeElement);
        }
      }
    });
  }

  testPurpose() {
    console.log(auth.currentUser)
  }

  toggleNav(status: boolean) {
    this.showMobileNav = status;
  }

  ngAfterViewInit() {
    this.gsapAnimations.animateTitle(this.titleHeading.nativeElement);
  }
}
