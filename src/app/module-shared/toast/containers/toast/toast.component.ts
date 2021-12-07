import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastMessage } from '../../toast.interface';
import { ToastService } from '../../toast.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent implements OnInit {

  messages: ToastMessage[] = [];
  constructor(private _toastService: ToastService, private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    this._toastService.messageObserver.subscribe(messages => {
      if (messages) {
        if (Array.isArray(messages)) {
          this.add(messages);
        } else {
          this.add([messages]);
        }
      }
    });
  }

  add(messages: ToastMessage[]): void {
    this.messages = this.messages ? [...this.messages, ...messages] : [...messages];
    this._cd.markForCheck();
  }

  onMessageClose(event: { index: number; message: ToastMessage }): void {
    this.messages.splice(event.index, 1);
    this._cd.detectChanges();
  }

}
