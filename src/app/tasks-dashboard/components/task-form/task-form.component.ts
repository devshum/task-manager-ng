import { TaskView, TaskPostData } from './../../../core/models/task.interface';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EnumStatus } from 'src/app/core/enums/task.statuses';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent implements OnInit {
  @Input() tasks: TaskView[] = [];
  @Output() hookTask: EventEmitter<TaskPostData> = new EventEmitter<TaskPostData>();
  @Output() formShown: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectStatus: EventEmitter<string> = new EventEmitter<string>();
  isFormShown = false;
  isSideNavShown = false;
  selectedStatus: string;
  statusOptions: string[] = [
    EnumStatus.all,
    EnumStatus.pending,
    EnumStatus.closed,
    EnumStatus.inProgress
  ];
  constructor() {}

  get suffix(): string {
    return this.tasks.length > 1 ? 'tasks' : 'task';
  }

  ngOnInit(): void {
    this.selectedStatus = EnumStatus.all;
  }

  toggleForm(): void {
    this.isFormShown = !this.isFormShown;
    this.formShown.emit(this.isFormShown);
  }

  selectStatusHandler(): void {
    if(this.selectedStatus === EnumStatus.all) {
      this.selectStatus.emit('');
    } else {
      this.selectStatus.emit(this.selectedStatus);
    }
  }

  onHookTask(event: TaskPostData): void {
    this.hookTask.emit(event);
  }

  openSideNav(): void {
    this.isSideNavShown = !this.isSideNavShown;
  }

  onSideNavShown(event: boolean): void {
    this.isSideNavShown = event;
  }
}
