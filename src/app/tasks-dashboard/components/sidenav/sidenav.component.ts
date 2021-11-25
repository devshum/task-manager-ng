import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() sideNavShown = false;
  @Output() isSideNavShown: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  closeSideNav(): void {
    this.sideNavShown = !this.sideNavShown;
    this.isSideNavShown.emit(this.sideNavShown);
  }
}
