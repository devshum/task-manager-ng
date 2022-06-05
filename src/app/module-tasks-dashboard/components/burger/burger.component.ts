import { NavbarService } from '../../../core/services/navbar/navbar.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BurgerComponent implements OnInit {
  public isNavbarOpened$: Observable<boolean>;

  constructor(
    private _navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    this.isNavbarOpened$ = this._navbarService.navbar$;
  }

  public toggleNavbar(): void {
    this._navbarService.toggleNavbar();
  }
}
