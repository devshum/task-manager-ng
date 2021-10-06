import { Component, Input } from "@angular/core";
import { Task } from "../../../core/models/task.interface";
import { EnumImportance } from "../../../core/enums/task.importances";
import { EnumStatus } from "src/app/core/enums/task.statuses";
import { EnumDate } from "src/app/core/enums/date.today";
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})

export class TaskComponent {
  @Input() task: Task;

  taskImportance = EnumImportance;
  taskStatus = EnumStatus;
  taskDate = EnumDate;

  constructor() {}
}