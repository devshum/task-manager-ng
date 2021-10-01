import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { TaskComponent } from "./components/task/task.component";
import { TaskDashboardComponent } from "./containers/tasks-dashboard/tasks-dashboard.component";
import { TasksDashBoardService } from "./tasks-dashboard.service";

@NgModule({
  declarations: [
    TaskComponent,
    TaskDashboardComponent
  ],
  imports: [
    
  ],
  exports: [
    TaskDashboardComponent,
    HttpClientModule
  ],
  providers: [
    TasksDashBoardService
  ]
})

export class TaskDashboardModule {}