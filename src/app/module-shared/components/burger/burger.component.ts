import { NavbarService } from './../../../core/services/navbar/navbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent implements OnInit {
  public isNavbarOpened: boolean;
  constructor(private _navbarService: NavbarService) { }

  ngOnInit(): void {
    this._navbarService.navbar$.subscribe(navbarStatus => this.isNavbarOpened = navbarStatus);
  }

  toggleNavbar(): void {
    this._navbarService.toggleNavbar();
  }
}
