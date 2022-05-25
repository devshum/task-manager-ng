import { NavbarService } from './../../../core/services/navbar/navbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isNavbarOpened: boolean;

  constructor(private _navbarService: NavbarService) { }

  ngOnInit(): void {
    this._navbarService.navbar$.subscribe(navbarStatus => this.isNavbarOpened = navbarStatus);
  }
}
