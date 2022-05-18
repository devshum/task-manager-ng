import { TasksDashboardService } from './../../../core/services/tasks-dashboard/tasks-dashboard.service';
import { Component, Input, OnInit } from '@angular/core';
import { TaskView } from 'src/app/core/models/task.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumImportance } from 'src/app/core/enums/task.importances';
import { EnumStatus } from 'src/app/core/enums/task.statuses';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() task: TaskView;
  @Input() tasks: TaskView[] = [];
  @Input() formShown = false;
  @Input() sideNavShown = false;
  @Input() resetForm: boolean;
  @Input() btnLabel: string;
  @Input() styleClass: string;
  currentDate = new Date();
  form: FormGroup;
  statusOptions: string[] = [
    EnumStatus.pending,
    EnumStatus.closed,
    EnumStatus.inProgress
  ];
  importanceOptions: string[] = [
    EnumImportance.minor,
    EnumImportance.normal,
    EnumImportance.critical
  ];
  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _tasksService: TasksDashboardService
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

  handleSubmit(): void {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this._tasksService.addTask(this.form.value);

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

  valid(control: AbstractControl, type: string): boolean {
    return control.hasError(type) && control.invalid && (control.dirty || control.touched);
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
