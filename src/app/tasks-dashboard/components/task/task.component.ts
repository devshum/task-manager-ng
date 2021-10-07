import { Component, Input } from '@angular/core';
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

  taskImportance = EnumImportance;
  taskStatus = EnumStatus;

  constructor() {}
}
