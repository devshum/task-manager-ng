import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './containers/toast/toast.component';
import { MessageComponent } from './components/message/message.component';
import { ToastService } from '../core/services/toast/toast.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BurgerComponent } from './components/burger/burger.component';

@NgModule({
  declarations: [
    ToastComponent,
    MessageComponent,
    NavigationComponent,
    BurgerComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule.forRoot({ baseUrl: '/assets/icons/', bypassHttpClientInterceptorChain: true })
  ],
  providers: [ToastService],
  exports: [
    ToastComponent,
    InlineSVGModule,
    NavigationComponent,
    BurgerComponent
  ]
})
export class ToastModule { }
