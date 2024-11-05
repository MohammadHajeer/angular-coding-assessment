import { Injectable } from '@angular/core';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class GsapAnimationsService {
  slideInWithFade(element: HTMLElement) {
    gsap.fromTo(
      element,
      { opacity: 0, y: 200 },
      { opacity: 1, y: 0, ease: 'back.out' }
    );
  }

  animateTitle(title: HTMLElement) {
    gsap.fromTo(
      title.children,
      { opacity: 0, stagger: 0.2, x: -20, scale: 0.5 },
      { opacity: 1, ease: 'back.out', stagger: 0.2, x: 0, scale: 1 }
    );
  }

  showTitle(title: HTMLElement) {
    gsap.fromTo(
      title,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, ease: 'back.out', scale: 1 }
    );
  }

  animateLoadingButton(button: HTMLElement) {
    if (gsap.isTweening(button)) {
      return;
    }
    gsap.to(button, {
      opacity: 0.5,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
    });

    gsap.to(button.children, {
      scale: 1.3,
      width: 20,
      duration: 0.4,
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      ease: 'back.in',
    });
  }

  resetAnimation(element: HTMLElement) {
    gsap.killTweensOf(element);
    gsap.set(element, { clearProps: 'all' });
  }
}
