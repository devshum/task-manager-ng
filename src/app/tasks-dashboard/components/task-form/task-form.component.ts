import { TaskView, TaskPostData } from './../../../core/models/task.interface';
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent {
  @Input() tasks: TaskView[] = [];
  @Output() hookTask: EventEmitter<TaskPostData> = new EventEmitter<TaskPostData>();
  @Output() formShown: EventEmitter<boolean> = new EventEmitter<boolean>();
  isFormShown = false;
  constructor() {}

  toggleForm(): void {
    this.isFormShown = !this.isFormShown;
    this.formShown.emit(this.isFormShown);
  }

  onHookTask(event: TaskPostData): void {
    this.hookTask.emit(event);
  }

  get suffix(): string {
    return this.tasks.length > 1 ? 'tasks' : 'task';
  }
}
