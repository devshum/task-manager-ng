import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks'
  },
  { path: 'tasks', loadChildren: () => import('./module-tasks-dashboard/tasks-dashboard.module').then(m => m.TaskDashboardModule) },
  { path: '404', loadChildren: () => import('./module-not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
