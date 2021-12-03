import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDashboardComponent } from './module-tasks-dashboard/containers/tasks-dashboard/tasks-dashboard.component';
import { NotFoundComponent } from './module-tasks-dashboard/components/not-found/not-found.component';

const routes: Routes = [
  { path: 'tasks', component: TaskDashboardComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
