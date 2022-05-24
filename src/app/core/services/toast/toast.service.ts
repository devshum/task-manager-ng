import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastMessage } from '../../models/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  messages$ = new BehaviorSubject<ToastMessage | ToastMessage[]>([]);
  messageObserver$ = this.messages$.asObservable();
  constructor() { }


  add(message: Partial<Toast>): void {
    if (message) {
      this.messages$.next(new ToastMessage(message));
    }
  }
}
