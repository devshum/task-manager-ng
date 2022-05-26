import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public form$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isFormOpened = false;

  constructor() { }

  public toggleForm(): void {
    this._isFormOpened = !this._isFormOpened;
    this.form$.next(this._isFormOpened);
  }
}
