import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDashboardComponent } from './components/tasks-dashboard/tasks-dashboard.component';
import { ButtonComponent } from './components/button/button.component';
import { TasksDashboardService } from '../core/services/tasks-dashboard/tasks-dashboard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NotFoundComponent } from '../module-not-found/components/not-found/not-found.component';
import { ToastModule } from '../module-toast/toast.module';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TasksDashboardRoutingModule } from './tasks-dashboard-routing.module';

@NgModule({
  declarations: [
    TaskComponent,
    TaskFormComponent,
    ButtonComponent,
    TaskDashboardComponent,
    PreloaderComponent,
    FormComponent,
    SidenavComponent,
    NotFoundComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    FormsModule,
    ToastModule,
    TasksDashboardRoutingModule
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
