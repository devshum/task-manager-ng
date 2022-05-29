import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastMessage } from 'src/app/core/models/toast.interface';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { fadeDelay } from 'src/app/core/animations/animations';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [fadeDelay],
})
export class ToastComponent implements OnInit {
  public messages: ToastMessage[] = [];
  private _unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private _toastService: ToastService,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._toastService.messages$
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(messages => {
      if (messages) {
        if (Array.isArray(messages)) {
          this.add(messages);
        } else {
          this.add([messages]);
        }
      }
    });
  }

  public trackItem(index: number, item: ToastMessage): number {
    return index;
  }

  public add(messages: ToastMessage[]): void {
    this.messages = this.messages ? [...this.messages, ...messages] : [...messages];
    this._cd.markForCheck();
  }

  public onMessageClose(event: { index: number; message: ToastMessage }): void {
    this.messages.splice(event.index, 1);
    this._cd.detectChanges();
  }
}
