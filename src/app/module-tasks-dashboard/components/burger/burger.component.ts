import { NavbarService } from '../../../core/services/navbar/navbar.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})

export class BurgerComponent implements OnInit, OnDestroy {
  public isNavbarOpened: boolean;
  private _unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private _navbarService: NavbarService) { }

  ngOnInit(): void {
    this._navbarService.navbar$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(navbarStatus => this.isNavbarOpened = navbarStatus);
  }

  public toggleNavbar(): void {
    this._navbarService.toggleNavbar();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }
}
