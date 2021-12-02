import { TaskView, TaskPostData } from './../../../core/models/task.interface';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskFilterParams } from 'src/app/core/models/filter.interface';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent {
  @Input() tasks: TaskView[] = [];
  @Output() hookTask: EventEmitter<TaskPostData> = new EventEmitter<TaskPostData>();
  @Output() formShown: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() filterOptions: EventEmitter<TaskFilterParams> = new EventEmitter<TaskFilterParams>();
  @Output() sideNavShown: EventEmitter<boolean> = new EventEmitter<boolean>();
  isFormShown = false;
  isSideNavShown = false;
  filteredOptions: TaskFilterParams;
  constructor() {}

  get suffix(): string {
    return this.tasks.length > 1 ? 'tasks' : 'task';
  }

  toggleForm(): void {
    this.isFormShown = !this.isFormShown;
    this.formShown.emit(this.isFormShown);
  }

  onHookTask(event: TaskPostData): void {
    this.hookTask.emit(event);
  }

  openSideNav(): void {
    this.isSideNavShown = !this.isSideNavShown;
    this.sideNavShown.emit(this.isSideNavShown);
  }
}
