import { TaskFilterParams } from './../../../core/models/filter.interface';
import { FilterOptionsService } from '../../../core/services/filter-options/filter-options.service';
import { SidenavService } from '../../../core/services/sidenav/sidenav.service';
import { FormService } from '../../../core/services/form/form.service';
import { TasksService } from '../../../core/services/tasks/tasks.service';
import { PaginationService } from '../../../core/services/pagination/pagination.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { ChangeDetectionStrategy, Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
import { Toast } from 'src/app/core/models/toast.interface';
@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeDelay, fadeCommon],
})

export class TaskDashboardComponent implements OnInit, OnDestroy {
  public tasks: TaskView[];
  public isFormShown$: Observable<boolean>;
  public isSideNavShown$: Observable<boolean>;
  public currentPage: number;
  public pageLimit = 4;
  public totalTasks: number;
  public pages: number;
  public status: string;
  public importance: string;
  public sort = 'createdAt';
  public loading$: Observable<boolean>;
  public lastPageTasks: TaskView[];
  public offset: number;

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
    private _optionsService: FilterOptionsService,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._paginationService.currentPage$.pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe((currentPage: number) => {
      this.currentPage = currentPage;

      this._getTasksList({
        status: this.status,
        importance: this.importance,
        sort: this.sort,
        page: this.currentPage,
        limit: this.pageLimit
      });
    });

    this._tasksService.tasks$.pipe(
      tap((eventAction: string) => {
        if(eventAction === 'add') {
          this. addTask();
        } else if(eventAction === 'delete') {
          this. removeTask();
        } else if(eventAction === 'edit') {
          this. editTask();
        }
      }),
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
    .subscribe((query: TaskFilterParams) => {
      this.status = query.status;
      this.importance = query.importance;
      this.sort = query.sort;
      this._paginationService.initialPage();
    });

    this.isFormShown$ = this._formService.form$;

    this.isSideNavShown$ = this._sidenavService.sidenav$;
  }

  public trackItem(index: number, item: TaskView): TaskView {
    return item;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }

  public addTask(): void {
    this._paginationService.changePage(this.offset);
    this._toastService.add(this._addToastData);
  }

  public removeTask(): void {
    if(this.tasks.length === 1 && this.currentPage > 1) {
      this._paginationService.prevPage();
    }

    this._toastService.add(this._deleteToastData);
  }

  public editTask(): void {
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
        this.totalTasks = data.total;

        const maxCounts = this.pages * data.limit;
        const diff = maxCounts - this.totalTasks;

        this.offset = this.currentPage;

        if (diff >= 0) {
          if (diff === 0) {
            this.offset = this.pages + 1;
          } else {
            this.offset = this.pages;
          }
        }

        this._loaderService.end();
        this._cd.detectChanges();
      });
  }
}
