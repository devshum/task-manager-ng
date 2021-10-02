import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { TaskComponent } from "./components/task/task.component";
import { TaskDashboardComponent } from "./containers/tasks-dashboard/tasks-dashboard.component";
import { TasksDashoardService } from '../core/services/tasks-dashboard.service';

@NgModule({
  declarations: [
    TaskComponent,
    TaskDashboardComponent
  ],
  imports: [
    CommonModule
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