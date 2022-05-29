import { TasksService } from './../../../core/services/tasks/tasks.service';
import { TasksDashboardService } from './../../../core/services/tasks-dashboard/tasks-dashboard.service';
import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { TaskView } from '../../../core/models/task.interface';
import { EnumImportance } from '../../../core/enums/task.importances';
import { EnumStatus } from 'src/app/core/enums/task.statuses';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskComponent implements OnDestroy {
  @Input() task: TaskView;
  @Input() sideNavShown = false;

  public taskImportance = EnumImportance;
  public taskStatus = EnumStatus;
  public isTaskEditOpen = false;

  private _unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private _tasksDashboardService: TasksDashboardService,
    private _tasksService: TasksService
  ) {}

  removeTask(): void {
    this._tasksDashboardService
      .removeTask(this.task.id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => this._tasksService.tasks$.next('delete'));
  }

  toggleTaskEdit(): void {
    this.isTaskEditOpen = !this.isTaskEditOpen;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }
}
