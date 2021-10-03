import { Task } from './../../../core/models/task.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent {
  @Input() tasks: Task[] = [];

  constructor() {}

  get suffix(): string {
    return this.tasks.length > 1 ? 'tasks' : 'task';
  }
}
