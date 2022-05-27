import { FilterOptionsService } from '../../../core/services/filter-options/filter-options.service';
import { SidenavService } from '../../../core/services/sidenav/sidenav.service';
import { FormService } from '../../../core/services/form/form.service';
import { TasksService } from '../../../core/services/tasks/tasks.service';
import { PaginationService } from '../../../core/services/pagination/pagination.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { TasksDashboardService } from '../../../core/services/tasks-dashboard/tasks-dashboard.service';
import { TaskView } from '../../../core/models/task.interface';
import { Observable, Subject } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { EnumToastEdit } from 'src/app/core/enums/toast.edit';
import { EnumToastDelete } from 'src/app/core/enums/toast.delete';
import { EnumToastAdd } from 'src/app/core/enums/toast.add';
import { fadeDelay, fadeCommon } from 'src/app/core/animations/animations';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss'],
  animations: [fadeDelay, fadeCommon],
})

export class TaskDashboardComponent implements OnInit, OnDestroy {
  public tasks: TaskView[];
  public isFormShown: boolean;
  public isSideNavShown: boolean;
  public currentPage: number;
  public pageLimit = 4;
  public totalTasksPerPage: TaskView[];
  public totalTasks: number;
  public pages: number;
  public status: string;
  public importance: string;
  public sort = 'issue';
  public loading$: Observable<boolean>;

  private _editToastData: any = {
    id: EnumToastEdit.id,
    severity: EnumToastEdit.severity,
    life: EnumToastEdit.life,
    title: EnumToastEdit.title,
    message: EnumToastEdit.message
  };
  private _addToastData: any = {
    id: EnumToastAdd.id,
    severity: EnumToastAdd.severity,
    life: EnumToastAdd.life,
    title: EnumToastAdd.title,
    message: EnumToastAdd.message
  };
  private _deleteToastData: any = {
    id: EnumToastDelete.id,
    severity: EnumToastDelete.severity,
    life: EnumToastDelete.life,
    title: EnumToastDelete.title,
    message: EnumToastDelete.message
  };

  private _unsubscribe$: Subject<any> = new Subject();

  constructor(
    private _tasksDashboardService: TasksDashboardService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _paginationService: PaginationService,
    private _tasksService: TasksService,
    private _formService: FormService,
    private _sidenavService: SidenavService,
    private _optionsService: FilterOptionsService
  ) { }

  ngOnInit(): void {
    this._tasksService.tasks$.pipe(
      tap(eventAction => {
        if(eventAction === 'add') {
          this._addTask();
        } else if(eventAction === 'delete') {
          this._removeTask();
        } else if(eventAction === 'edit') {
          this._editTask();
        }
      }),
      switchMap(() => this._paginationService.currentPage$),
      tap((currentPage: number) => this.currentPage = currentPage),
      takeUntil(this._unsubscribe$)
    ).subscribe(() => {
      this._getTasksList({
        status: this.status,
        importance: this.importance,
        sort: this.sort,
        page: this.currentPage,
        limit: this.pageLimit
      });
    });

    this._optionsService.filter$
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(query => {
      this.status = query.status;
      this.importance = query.importance;
      this.sort = query.issue;
      this._paginationService.initial();
    });

    this._formService.form$
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(formStatus => this.isFormShown = formStatus);

    this._sidenavService.sidenav$
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(sidenavStatus => this.isSideNavShown = sidenavStatus);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }

  private _addTask(): void {
    if(this.totalTasksPerPage.length === this.pageLimit && this.currentPage === this.pages) {
      this._paginationService.next();
    } else if (this.currentPage !== this.pages) {
      this.currentPage = this.pages;
    }

    this._toastService.add(this._addToastData);
  }

  private _removeTask(): void {
    if(this.totalTasksPerPage.length === 1 && this.currentPage > 1) {
      this._paginationService.prev();
    }

    this._toastService.add(this._deleteToastData);
  }

  private _editTask(): void {
    this._toastService.add(this._editToastData);
  }

  private _getTasksList(filterParams: any): void {
    this._loaderService.start();

    this._tasksDashboardService
      .getTasks(filterParams)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(data => {
        this.tasks = data.result;
        this.pages = Math.ceil(data.total / data.limit) || 1;
        this.totalTasksPerPage = data.result;
        this.totalTasks = data.total;
        this._loaderService.end();
      });
  }
}
