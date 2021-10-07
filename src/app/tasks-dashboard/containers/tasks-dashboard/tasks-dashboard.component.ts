import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TasksDashboardService } from './../../../core/services/tasks-dashboard.service';
import { TaskView, TaskPostData } from '../../../core/models/task.interface';
@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss']
})

export class TaskDashboardComponent implements OnInit {
  tasks: TaskView[] = [];

  constructor(
    private _tasksService: TasksDashboardService
  ) { }

  ngOnInit(): void {
    this._getTasksList();
  }

  onAddTask(event: TaskPostData): void {
    this._tasksService
      .addTask(event)
      .subscribe(() => {
        this._getTasksList();
      });
  }

  private _getTasksList(): void {
    this._tasksService
      .getTasks()
      .subscribe(data => { this.tasks = data; });
  }
}
