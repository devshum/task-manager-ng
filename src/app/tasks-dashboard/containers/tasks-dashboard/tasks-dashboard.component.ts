import { LoaderService } from './../../../core/services/loader/loader.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TasksDashboardService } from './../../../core/services/tasks-dashboard/tasks-dashboard.service';
import { TaskView, TaskPostData } from '../../../core/models/task.interface';
import { Observable } from 'rxjs';
import { TaskFilterParams } from 'src/app/core/models/filter.interface';
@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss']
})

export class TaskDashboardComponent implements OnInit {
  tasks: TaskView[];
  isFormShown = false;
  isSideNavShown = false;
  loading$: Observable<boolean | null>;

  constructor(
    private _tasksService: TasksDashboardService,
    private _loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this._getTasksList({sort: '-createdAt'});
  }

  onAddTask(event: TaskPostData): void {
    this._loaderService.start();
    this._tasksService
      .addTask(event)
      .subscribe(() => {
        this._getTasksList({sort: '-createdAt'});
      });
  }

  onRemoveTask(event: TaskView): void {
    this._loaderService.start();
    this._tasksService
      .removeTask(event)
      .subscribe(() => {
        this._getTasksList({sort: '-createdAt'});
      });
  }

  onEditTask(event: TaskView | any): void {
    this._loaderService.start();
    this._tasksService
      .editTask(event)
      .subscribe(() => {
        this._getTasksList({sort: '-createdAt'});
      });
  }

  onFormShown(event: boolean): void {
    this.isFormShown = event;
  }

  onSideNavShown(event: boolean): void {
    this.isSideNavShown = event;
  }

  onFilterOptions(event: TaskFilterParams): void {
    this._loaderService.start();
    this._getTasksList({status: event.status,
                        importance: event.importance,
                        sort: event.date});
  }

  private _getTasksList(filterParams: any): void {
    this._tasksService
      .getTasks(filterParams)
      .subscribe(data => {
        this.tasks = data;
        this._loaderService.end();
    });
  }
}
