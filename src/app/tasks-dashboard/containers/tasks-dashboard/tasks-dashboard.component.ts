import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { TasksDashBoardService } from "../../tasks-dashboard.service";
import { Task } from "../../models/task.interface";
@Component({
  selector: 'tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss']
})

export class TaskDashboardComponent implements OnInit {
  tasks: Task[] = []

  constructor(
    private tasksService: TasksDashBoardService
  ) {}

  ngOnInit() {
    this.tasksService
        .getTasks()
        .subscribe((data: Task[]) => this.tasks = data)
  }
}