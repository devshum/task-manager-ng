import { NavbarService } from '../../../core/services/navbar/navbar.service';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavigationComponent implements OnInit, OnDestroy {
  public isNavbarOpened: boolean;
  private _unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private _navbarService: NavbarService,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._navbarService.navbar$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(navbarStatus => {
        this.isNavbarOpened = navbarStatus;
        this._cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }
}
