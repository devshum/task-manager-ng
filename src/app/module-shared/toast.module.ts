import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './containers/toast/toast.component';
import { MessageComponent } from './components/message/message.component';
import { ToastService } from '../core/services/toast/toast.service';

@NgModule({
  declarations: [
    ToastComponent,
    MessageComponent
  ],
  imports: [CommonModule],
  providers: [ToastService],
  exports: [ToastComponent]
})
export class ToastModule { }
