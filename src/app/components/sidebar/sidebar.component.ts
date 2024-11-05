import { Component, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { dashboardLinks } from '../../constants';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  links = dashboardLinks;
  router = inject(Router);
  activatedRoute = '/dashboard/profile';

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activatedRoute = event.urlAfterRedirects;
      }
    });
  }

  isActive(path: string) {
    return this.activatedRoute === path;
  }
}
