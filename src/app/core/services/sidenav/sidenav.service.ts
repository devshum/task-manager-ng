import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  public sidenav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isSidenavShown = false;

  constructor() { }

  public toggleSidenav() {
    this._isSidenavShown = !this._isSidenavShown;
    this.sidenav$.next(this._isSidenavShown);
  }
}
