import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgModule } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDashboardComponent } from './containers/tasks-dashboard/tasks-dashboard.component';
import { ButtonComponent } from './components/button/button.component';
import { TasksDashboardService } from '../core/services/tasks-dashboard/tasks-dashboard.service';
import {  ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    TaskComponent,
    TaskFormComponent,
    ButtonComponent,
    TaskDashboardComponent,
    PreloaderComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule.forRoot({ baseUrl: '/assets/icons/', bypassHttpClientInterceptorChain: true }),
    ReactiveFormsModule,
    SelectDropDownModule,
    FormsModule
  ],
  exports: [
    TaskDashboardComponent,
    HttpClientModule
  ],
  providers: [
    TasksDashboardService,
    DatePipe
  ]
})

export class TaskDashboardModule {}
