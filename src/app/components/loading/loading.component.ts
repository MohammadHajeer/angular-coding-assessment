import { Component } from '@angular/core';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [],
  template: ` <img
    src="/loading.svg"
    alt="loading..."
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60"
  />`,
})
export class LoadingComponent {}
