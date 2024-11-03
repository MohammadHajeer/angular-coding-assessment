import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'split-word',
  standalone: true,
  templateUrl: './split-word.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SplitWordComponent {
  @Input() word: string = '';

  getSplitWord() {
    return this.word.split('');
  }
}
