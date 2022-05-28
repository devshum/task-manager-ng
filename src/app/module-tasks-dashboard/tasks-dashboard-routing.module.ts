import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskDashboardComponent } from './components/tasks-dashboard/tasks-dashboard.component';

const routes: Routes = [{ path: '', component: TaskDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksDashboardRoutingModule {}
