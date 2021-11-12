import { LoaderService } from './../../../core/services/loader/loader.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TasksDashboardService } from './../../../core/services/tasks-dashboard/tasks-dashboard.service';
import { TaskView, TaskPostData } from '../../../core/models/task.interface';
import { Observable, timer } from 'rxjs';
@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss']
})

export class TaskDashboardComponent implements OnInit {
  tasks: TaskView[];
  isFormShown = false;
  loading$: Observable<boolean | null>;

  constructor(
    private _tasksService: TasksDashboardService,
    private _loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this._loaderService.start();
    this._getTasksList();
  }

  onAddTask(event: TaskPostData): void {
    this._loaderService.start();
    this._tasksService
      .addTask(event)
      .subscribe(() => {
        this._getTasksList();
      });
  }

  onRemoveTask(event: TaskView): void {
    this._loaderService.start();
    this._tasksService
      .removeTask(event)
      .subscribe(() => {
        this._getTasksList();
      });
  }

  onEditTask(event: TaskView | any): void {
    this._loaderService.start();
    this._tasksService
      .editTask(event)
      .subscribe(() => {
        this._getTasksList();
      });
  }

  onFormShown(event: boolean) {
    this.isFormShown = event;
  }

  private _getTasksList(): void {
    this._tasksService
      .getTasks()
      .subscribe(data => {
        this.tasks = data;
        this._loaderService.end();
      });
  }
}
