import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string;
  @Input() type: string;
  @Input() tasks: number;
  @Input() formShown = false;
  @Input() sideNavShown = false;

  constructor() { }
}