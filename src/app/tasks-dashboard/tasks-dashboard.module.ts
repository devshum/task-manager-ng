import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgModule } from "@angular/core";
import { TaskComponent } from "./components/task/task.component";
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDashboardComponent } from "./containers/tasks-dashboard/tasks-dashboard.component";
import { ButtonComponent } from './components/button/button.component';
import { TasksDashoardService } from '../core/services/tasks-dashboard.service';
@NgModule({
  declarations: [
    TaskComponent,
    TaskFormComponent,
    ButtonComponent,
    TaskDashboardComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule.forRoot({ baseUrl: '/assets/icons/', bypassHttpClientInterceptorChain: true }),
  ],
  exports: [
    TaskDashboardComponent,
    HttpClientModule
  ],
  providers: [
    TasksDashoardService
  ]
})

export class TaskDashboardModule {}