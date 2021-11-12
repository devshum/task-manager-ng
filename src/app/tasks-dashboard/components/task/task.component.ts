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
  @Output() remove: EventEmitter<TaskView> = new EventEmitter<TaskView>();
  @Output() hookEditData: EventEmitter<any> = new EventEmitter<any>();
  taskImportance = EnumImportance;
  taskStatus = EnumStatus;
  isTaskEditOpen = false;

  constructor() {}

  removeTask(): void {
    this.remove.emit(this.task);
  }

  toggleTaskEdit(): void {
    this.isTaskEditOpen = !this.isTaskEditOpen;
  }

  onHookEdit(event: any): void {
    this.hookEditData.emit({event, id: this.task.id});
  }
}
