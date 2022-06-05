import { FilterOptionsService } from './../../../core/services/filter-options/filter-options.service';
import { ToastService } from './../../../core/services/toast/toast.service';
import { PaginationService } from './../../../core/services/pagination/pagination.service';
import { TasksService } from './../../../core/services/tasks/tasks.service';
import { TaskDashboardComponent } from './tasks-dashboard.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ToastModule } from 'src/app/module-toast/toast.module';
import { PreloaderComponent } from '../preloader/preloader.component';

describe('TaskDashboardComponent', () => {
  let component: TaskDashboardComponent;
  let fixture: ComponentFixture<TaskDashboardComponent>;
  let toastService: ToastService;
  let paginationService: PaginationService;
  let tasksService: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TaskDashboardComponent,
        PreloaderComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        SelectDropDownModule,
        FormsModule,
        ToastModule
      ],

    })
    .compileComponents();
    toastService = TestBed.inject(ToastService);
    paginationService = TestBed.inject(PaginationService);
    tasksService = TestBed.inject(TasksService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTask on add task event', () => {
    spyOn(component, 'addTask');
    tasksService.tasks$.next('add');
    // component.ngOnInit();
    expect(component.addTask).toHaveBeenCalled();
  });

  it('should call removeTask on remove task event', () => {
    spyOn(component, 'removeTask');
    tasksService.tasks$.next('delete');
    // component.ngOnInit();
    expect(component.removeTask).toHaveBeenCalled();
  });

  it('should call removeTask on delete task event', () => {
    spyOn(component, 'removeTask');
    tasksService.tasks$.next('delete');
    expect(component.removeTask).toHaveBeenCalled();
  });

  it('should call editTask on edit task event', () => {
    spyOn(component, 'editTask');
    tasksService.tasks$.next('edit');
    expect(component.editTask).toHaveBeenCalled();
  });

  it('should return  index', () => {
    const value = component.trackItem(5, {} as any);

    expect(value).toEqual(5);
  });

  it('should add toast message on editTask', () => {
    const addSpy = spyOn(toastService, 'add');

    component.editTask();
    expect(addSpy).toHaveBeenCalled();
  });


  it('should change next page', () => {
    component.currentPage = 1;
    component.pages = 1;
    component.tasks = [{}, {}, {}, {}] as any;
    component.pageLimit = 4;

    spyOn(paginationService, 'nextPage');
    const addSpy = spyOn(toastService, 'add');

    component.addTask();
    expect(paginationService.nextPage).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalled();
  });

  it('should change prev page', () => {
    component.tasks = [{}] as any;
    component.currentPage = 2;

    spyOn(paginationService, 'prevPage');
    const addSpy = spyOn(toastService, 'add');

    component.removeTask();
    expect(paginationService.prevPage).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalled();
  });

  it('should change page', () => {
    component.currentPage = 4;
    component.pages = 5;
    component.lastPageTasks = [{}, {}, {}] as any;
    component.pageLimit = 4;

    spyOn(paginationService, 'changePage');
    const addSpy = spyOn(toastService, 'add');

    component.addTask();
    expect(paginationService.changePage).toHaveBeenCalledWith(5);
    expect(addSpy).toHaveBeenCalled();
  });

  it('should change page + 1', () => {
    component.currentPage = 4;
    component.pages = 5;
    component.lastPageTasks = [{}, {}, {}, {}] as any;
    component.pageLimit = 4;

    spyOn(paginationService, 'changePage');
    const addSpy = spyOn(toastService, 'add');

    component.addTask();
    expect(paginationService.changePage).toHaveBeenCalledWith(6);
    expect(addSpy).toHaveBeenCalled();
  });

  it('should recieve query', () => {
    const optionsService = TestBed.inject(FilterOptionsService);

    optionsService.filter$.next({status: 'pending', importance: 'normal', data: '-createdAt'});

    expect(component.status).toEqual('pending');
    expect(component.importance).toEqual('normal');
    expect(component.sort).toEqual('-createdAt');
  });
});
