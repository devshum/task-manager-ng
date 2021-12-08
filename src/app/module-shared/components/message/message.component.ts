/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter,
  Input, NgZone, OnDestroy, OnInit, Output, ViewEncapsulation
} from '@angular/core';
import { ToastMessage } from 'src/app/core/models/toast.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() message: ToastMessage;
  @Input() index: number;
  @Output() onClose = new EventEmitter();
  timeout: any;
  constructor(private zone: NgZone) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initTimeout();
  }

  initTimeout(): void {
    if (this.message) {
      this.zone.runOutsideAngular(() => {
        this.timeout = setTimeout(() => {
          this.onClose.emit({
            index: this.index,
            message: this.message
          });
        }, this.message.life || 3000);
      });
    }
  }

  clearTimeout(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  onMouseEnter(): void {
    this.clearTimeout();
  }

  onMouseLeave(): void {
    this.initTimeout();
  }

  onCloseMessage(event: MouseEvent): void {
    this.clearTimeout();

    this.onClose.emit({
      index: this.index,
      message: this.message
    });

    event.preventDefault();
  }

  ngOnDestroy() {
    this.clearTimeout();
  }

}
