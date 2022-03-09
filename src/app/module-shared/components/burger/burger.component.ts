import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent {
  @Output() isNavbarOpened: EventEmitter<boolean> = new EventEmitter<boolean>();
  navbarOpened = false;
  constructor() { }

  openNavbar() {
    this.navbarOpened = !this.navbarOpened;

    this.isNavbarOpened.emit(this.navbarOpened);
  }

}
