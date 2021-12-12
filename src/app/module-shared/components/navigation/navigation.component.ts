import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() navbarOpened = false;
  constructor() { }

  goToLink(url: string): void {
    window.open(url, '_blank');
  }
}
