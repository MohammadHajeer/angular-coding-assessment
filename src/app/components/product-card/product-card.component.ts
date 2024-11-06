import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { Product } from '../../types';
import { CurrencyPipe } from '@angular/common';
import gsap from 'gsap';
import { GsapAnimationsService } from '../../services/gsap/gsap-animations.service';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @ViewChild('productDetails', { static: false }) productDetails!: ElementRef;
  @ViewChild('productCard', { static: false }) productCard!: ElementRef;
  productDetailsVisible = false;
  gsapAnimations = inject(GsapAnimationsService);

  constructor(private cdRef: ChangeDetectorRef) {}

  toggleProductDetails(status: boolean) {
    if (status) {
      this.productDetailsVisible = status;
      this.cdRef.detectChanges();
      gsap.fromTo(
        this.productDetails.nativeElement,
        { y: '100%', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'expo.out',
          duration: 0.5,
          onComplete: () => {},
        }
      );
    } else {
      gsap.to(this.productDetails.nativeElement, {
        y: '-100%',
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          this.productDetailsVisible = status;
          this.cdRef.detectChanges();
        },
      });
    }
  }

  onHover() {
   gsap.delayedCall(0.3, () => {
    gsap
    .timeline()
    .to(this.productCard.nativeElement, {
      rotate: 2,
      duration: 0.3,
      ease: 'power1.out',
    })
    .to(this.productCard.nativeElement, {
      rotate: -2,
      duration: 0.3,
      ease: 'power1.out',
    })
    .to(this.productCard.nativeElement, {
      rotate: 0,
      duration: 0.3,
      ease: 'power1.out',
    });
   })
  }

  onLeave() {
    this.gsapAnimations.resetAnimation(this.productCard.nativeElement);
  }
}
