import { InlineSVGModule } from 'ng-inline-svg';
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
  imports: [
    CommonModule,
    InlineSVGModule.forRoot({ baseUrl: '/assets/icons/', bypassHttpClientInterceptorChain: true })
  ],
  providers: [ToastService],
  exports: [
    ToastComponent,
    InlineSVGModule
  ]
})
export class ToastModule { }
