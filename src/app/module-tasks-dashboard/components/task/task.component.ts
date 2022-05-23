import { TasksDashboardService } from './../../../core/services/tasks-dashboard/tasks-dashboard.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskView } from '../../../core/models/task.interface';
import { EnumImportance } from '../../../core/enums/task.importances';
import { EnumStatus } from 'src/app/core/enums/task.statuses';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})

export class TaskComponent {
  @Input() task: TaskView;
  @Input() sideNavShown = false;
  taskImportance = EnumImportance;
  taskStatus = EnumStatus;
  isTaskEditOpen = false;

  constructor(
    private _tasksService: TasksDashboardService
  ) {}

  removeTask(): void {
    this._tasksService.removeTask(this.task.id);
  }

  toggleTaskEdit(): void {
    this.isTaskEditOpen = !this.isTaskEditOpen;
  }
}
