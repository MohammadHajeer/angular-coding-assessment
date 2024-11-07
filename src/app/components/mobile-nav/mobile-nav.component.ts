import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { dashboardLinks } from '../../constants';
import { GsapAnimationsService } from '../../services/gsap/gsap-animations.service';
import gsap from 'gsap';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'mobile-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-nav.component.html',
})
export class MobileNavComponent {
  links = dashboardLinks;
  router = inject(Router);
  activatedRoute = '/dashboard/profile';
  @Output() nav = new EventEmitter();
  gsapAnimations = inject(GsapAnimationsService);
  authService = inject(AuthService);
  
  constructor(private cdr: ChangeDetectorRef) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activatedRoute = event.urlAfterRedirects;
      }
    });
  }

  closeNav() {
    gsap.to(this.navBar.nativeElement, {
      opacity: 0,
      y: 100,
      ease: 'back.in',
      onComplete: () => {
        this.nav.emit(false);
        this.cdr.markForCheck()
      },
    });
  }

  @ViewChild('navBar', { static: false }) navBar!: ElementRef;
  

  isActive(path: string) {
    return this.activatedRoute === path;
  }

  ngAfterViewInit() {
    this.gsapAnimations.slideInWithFade(this.navBar.nativeElement);
  }
}
