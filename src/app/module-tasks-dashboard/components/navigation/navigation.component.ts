import { NavbarService } from '../../../core/services/navbar/navbar.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavigationComponent implements OnInit {
  public isNavbarOpened$: Observable<boolean>;

  constructor(
    private _navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    this.isNavbarOpened$ = this._navbarService.navbar$;
  }
}
