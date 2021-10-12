import { OnInit } from '@angular/core';
import { TaskView, TaskPostData } from './../../../core/models/task.interface';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumStatus } from 'src/app/core/enums/task.statuses';
import { EnumImportance } from 'src/app/core/enums/task.importances';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent implements OnInit{
  @Input() tasks: TaskView[] = [];
  @Output() addTask: EventEmitter<TaskPostData> = new EventEmitter<TaskPostData>();
  @Output() formShown: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  isFormShown = false;
  currentDate = new Date();
  statusOptions: string[] = [
    EnumStatus.pending,
    EnumStatus.inProgress
  ];
  importanceOptions: string[] = [
    EnumImportance.minor,
    EnumImportance.normal,
    EnumImportance.critical
  ];
  constructor(
    private _fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  toggleForm(): void {
    this.isFormShown = !this.isFormShown;
    this.formShown.emit(this.isFormShown);
  }

  handleSubmit(): void {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.addTask.emit(this.form.value);

      this.form.reset({
        name: '',
        date: '',
        status: EnumStatus.pending,
        importance: EnumImportance.minor
      });
    }
  }

  valid(control: AbstractControl, type: string): boolean {
    return control.hasError(type) && control.invalid && (control.dirty || control.touched);
  }

  get name(): AbstractControl {
    return this.form.get('name') as AbstractControl;
  }

  get date(): AbstractControl {
    return this.form.get('date') as AbstractControl;
  }

  get today(): string | null {
    return this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  get suffix(): string {
    return this.tasks.length > 1 ? 'tasks' : 'task';
  }

  private _initForm(): void {
    this.form = this._fb.group(
      {
        name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        date: ['', [Validators.required]], status: [EnumStatus.pending, []],
        importance: [EnumImportance.minor, []]
      });
  }
}
