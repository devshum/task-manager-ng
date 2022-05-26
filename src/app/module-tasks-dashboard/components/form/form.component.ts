import { BehaviorSubject, Subject } from 'rxjs';
import { TasksService } from './../../../core/services/tasks/tasks.service';
import { TasksDashboardService } from './../../../core/services/tasks-dashboard/tasks-dashboard.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TaskView } from 'src/app/core/models/task.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumImportance } from 'src/app/core/enums/task.importances';
import { EnumStatus } from 'src/app/core/enums/task.statuses';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() task: TaskView;
  @Input() tasks: TaskView[] = [];
  @Input() formShown = false;
  @Input() sideNavShown = false;
  @Input() resetForm: boolean;
  @Input() btnLabel: string;
  @Input() styleClass: string;

  public currentDate = new Date();
  public form: FormGroup;
  public statusOptions: string[] = [
    EnumStatus.pending,
    EnumStatus.closed,
    EnumStatus.inProgress
  ];
  public importanceOptions: string[] = [
    EnumImportance.minor,
    EnumImportance.normal,
    EnumImportance.critical
  ];

  private _unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _tasksDashboardService: TasksDashboardService,
    private _tasksService: TasksService
  ) { }

  get name(): AbstractControl {
    return this.form.get('name') as AbstractControl;
  }

  get date(): AbstractControl {
    return this.form.get('date') as AbstractControl;
  }

  get today(): string | null {
    return this._datePipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this._initForm();
  }

  public handleSubmit(): void {
    this.form.markAllAsTouched();
    if(this.form.valid) {

      if(this.btnLabel === 'Add') {
        this._tasksDashboardService
          .addTask(this.form.value)
          .pipe(takeUntil(this._unsubscribe$))
          .subscribe(() => this._tasksService.tasks$.next('add'));

      } else if(this.btnLabel === 'Edit') {
        this._tasksDashboardService
          .editTask(this.task.id, this.form.value)
          .pipe(takeUntil(this._unsubscribe$))
          .subscribe(() => this._tasksService.tasks$.next('edit'));
      }

      if(this.resetForm) {
        this.form.reset({
          name: '',
          date: '',
          status: EnumStatus.pending,
          importance: EnumImportance.minor
        });
      }
    }
  }

  public valid(control: AbstractControl, type: string): boolean {
    return control.hasError(type) && control.invalid && (control.dirty || control.touched);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }

  private _initForm(): void {
    this.form = this._fb.group(
      {
        name: [this.task ? this.task.name : '', [Validators.required, Validators.pattern('[-_a-zA-Z0-9 ]*')]],
        date: [this.task ? this.task.date : '', [Validators.required]],
        status: [this.task ? this.task.status : EnumStatus.pending, []],
        importance: [this.task ? this.task.importance : EnumImportance.minor, []]
      });
  }
}
