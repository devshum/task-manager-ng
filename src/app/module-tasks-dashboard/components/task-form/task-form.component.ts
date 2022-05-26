import { SidenavService } from './../../../core/services/sidenav/sidenav.service';
import { FormService } from './../../../core/services/form/form.service';
import { TaskView } from './../../../core/models/task.interface';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { TaskFilterParams } from 'src/app/core/models/filter.interface';
import { fadeCommon } from './../../../core/animations/animations';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  animations: [fadeCommon]
})

export class TaskFormComponent implements OnInit, OnDestroy {
  @Input() tasks: TaskView[] = [];
  @Input() totalTasks: number;
  @Output() filterOptions: EventEmitter<TaskFilterParams> = new EventEmitter<TaskFilterParams>();
  @Output() sideNavShown: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isFormShown: boolean;
  public isSideNavShown = false;
  filteredOptions: TaskFilterParams;
  private _unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private _formService: FormService,
    private _sidenavService: SidenavService
  ) {}

  get suffix(): string {
    return this.totalTasks > 1 ? 'tasks' : 'task';
  }

  ngOnInit(): void {
    this._formService.form$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(formStatus => this.isFormShown = formStatus);
  }

  public toggleForm(): void {
    this._formService.toggleForm();
  }

  public toggleSidenav(): void {
    this._sidenavService.toggleSidenav();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }
}
