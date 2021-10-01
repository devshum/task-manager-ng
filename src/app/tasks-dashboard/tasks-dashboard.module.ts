import { NgModule } from "@angular/core";
import { TaskComponent } from "./components/task/task.component";
import { TaskDashboardComponent } from "./containers/tasks-dashboard/tasks-dashboard.component";

@NgModule({
  declarations: [
    TaskComponent,
    TaskDashboardComponent
  ],
  imports: [
    
  ],
  exports: [
    TaskDashboardComponent
  ],
  providers: []
})

export class TaskDashboardModule {}