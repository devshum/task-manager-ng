import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public navbar$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isNavbarOpened = false;

  constructor() { }

  toggleNavbar(): void {
    this._isNavbarOpened = !this._isNavbarOpened;
    this.navbar$.next(this._isNavbarOpened);
  }
}
