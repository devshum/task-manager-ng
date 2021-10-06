import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { TasksDashoardService } from './../../../core/services/tasks-dashboard.service';
import { Task } from "../../../core/models/task.interface";
@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss']
})

export class TaskDashboardComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private _tasksService: TasksDashoardService
  ) { }

  getTasksSubscribe() {
    this._tasksService
      .getTasks()
      .subscribe(data => this.tasks = data);
  }

  ngOnInit(): void {
    this.getTasksSubscribe();
  }

  onAddTask(event: Task): void {
    this._tasksService
      .addTask(event)
      .subscribe(data => {
        this.getTasksSubscribe();
      })
  }
}