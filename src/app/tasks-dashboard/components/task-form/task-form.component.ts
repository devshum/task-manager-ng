import { OnInit } from '@angular/core';
import { Task } from './../../../core/models/task.interface';
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
  @Input() tasks: Task[] = [];
  @Output() addTask: EventEmitter<Task> = new EventEmitter<Task>()
  form: FormGroup;
  isFormShown: boolean = true;
  currentDate = new Date();
  taskData: Task;

  constructor(
    private _fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  get suffix(): string {
    return this.tasks.length > 1 ? 'tasks' : 'task';
  }

  private _initForm(): void {
    this.form = this._fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(200)]], 
        date: ['', [Validators.required]], 
        status: [EnumStatus.pending, []], 
        importance: [EnumImportance.minor, []]
      })
  }

  toggleForm(): void {
    this.isFormShown = !this.isFormShown;
  }

  handleSubmit(): void {
    this.form.markAllAsTouched();

    if(this.form.valid) {
      this.taskData = this.form.value;
      this.taskData.date = this.taskData.date === this.today ? 'today' : this.taskData.date;
      
      this.addTask.emit(this.taskData);
    }
  }

  valid(control: AbstractControl, type: string): boolean {
    return control.hasError(type) && control.invalid && (control.dirty || control.touched)
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
}
