import { LoaderService } from './../../../core/services/loader/loader.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TasksDashboardService } from './../../../core/services/tasks-dashboard/tasks-dashboard.service';
import { TaskView, TaskPostData } from '../../../core/models/task.interface';
import { Observable } from 'rxjs';
import { TaskFilterParams } from 'src/app/core/models/filter.interface';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { EnumToastEdit } from 'src/app/core/enums/toast.edit';
import { EnumToastDelete } from 'src/app/core/enums/toast.delete';
import { EnumToastAdd } from 'src/app/core/enums/toast.add';
import { fadeDelay, fadeCommon } from 'src/app/core/animations/animations';
@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss'],
  animations: [fadeDelay, fadeCommon],
})

export class TaskDashboardComponent implements OnInit {
  tasks: TaskView[];
  isFormShown = false;
  isSideNavShown = false;
  currentPage = 1;
  pageLimit = 4;
  totalTasksPerPage: TaskView[];
  totalTasks: number;
  pages: number;
  status: string;
  importance: string;
  sort = '-createdAt';
  loading$: Observable<boolean | null>;
  editToastData: any = {
    id: EnumToastEdit.id,
    severity: EnumToastEdit.severity,
    life: EnumToastEdit.life,
    title: EnumToastEdit.title,
    message: EnumToastEdit.message
  };
  addToastData: any = {
    id: EnumToastAdd.id,
    severity: EnumToastAdd.severity,
    life: EnumToastAdd.life,
    title: EnumToastAdd.title,
    message: EnumToastAdd.message
  };
  deleteToastData: any = {
    id: EnumToastDelete.id,
    severity: EnumToastDelete.severity,
    life: EnumToastDelete.life,
    title: EnumToastDelete.title,
    message: EnumToastDelete.message
  };

  constructor(
    private _tasksService: TasksDashboardService,
    private _loaderService: LoaderService,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    this._getTasksList({
      sort: this.sort,
      page: this.currentPage,
      limit: this.pageLimit
    });
  }

  onAddTask(event: TaskPostData): void {
    this._loaderService.start();
    this._tasksService
      .addTask(event)
      .subscribe(() => {
        this._getTasksList({
          sort: this.sort,
          page: this.currentPage,
          limit: this.pageLimit
        });
        this._toastService.add(this.addToastData);
      });
  }

  onRemoveTask(event: TaskView): void {
    if(this.totalTasksPerPage.length === 1 && this.currentPage > 1) {
      this.pages--;
      this.currentPage = this.pages;
    }
    this._loaderService.start();
    this._tasksService
      .removeTask(event)
      .subscribe(() => {
        this._getTasksList({
          status: this.status,
          importance: this.importance,
          sort: this.sort,
          page: this.currentPage,
          limit: this.pageLimit
        });
        this._toastService.add(this.deleteToastData);
      });
  }

  onEditTask(event: TaskView | any): void {
    this._loaderService.start();
    this._tasksService
      .editTask(event)
      .subscribe(() => {
         this._getTasksList({
          sort: this.sort,
          page: this.currentPage,
          limit: this.pageLimit
        });
        this._toastService.add(this.editToastData);
      });
  }

  onFormShown(event: boolean): void {
    this.isFormShown = event;
  }

  onSideNavShown(event: boolean): void {
    this.isSideNavShown = event;
  }

  onFilterOptions(event: TaskFilterParams): void {
    this.currentPage = 1;
    this.status = event.status;
    this.importance = event.importance;
    this.sort = event.date;

    this._loaderService.start();
    this._getTasksList({
      status: this.status,
      importance: this.importance,
      sort: this.sort,
      page: this.currentPage,
      limit: this.pageLimit
    });
  }

  prevPage(): void {
    this._updatePage('prev');
  }

  nextPage(): void {
    this._updatePage('next');
  }

  private _getTasksList(filterParams: any): void {
    this._tasksService
      .getTasks(filterParams)
      .subscribe(data => {
        this.tasks = data.result;
        this.pages = Math.ceil(data.total / data.limit);
        this.totalTasksPerPage = data.result;
        this.totalTasks = data.total;
        this._loaderService.end();
      });
  }

  private _updatePage(val: string): void {
    this._loaderService.start();
    if (val === 'prev') {
      this.currentPage--;
      this._getTasksList({
        status: this.status,
        importance: this.importance,
        sort: this.sort,
        page: this.currentPage,
        limit: this.pageLimit
      });
    }

    if (val === 'next') {
      this.currentPage++;
      this._getTasksList({
        status: this.status,
        importance: this.importance,
        sort: this.sort,
        page: this.currentPage,
        limit: this.pageLimit
      });
    }
  }
}
