import { NavbarService } from '../../../core/services/navbar/navbar.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit, OnDestroy {
  public isNavbarOpened: boolean;
  private _unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private _navbarService: NavbarService) { }

  ngOnInit(): void {
    this._navbarService.navbar$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(navbarStatus => this.isNavbarOpened = navbarStatus);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }
}
