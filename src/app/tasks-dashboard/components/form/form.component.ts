import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskView } from 'src/app/core/models/task.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumImportance } from 'src/app/core/enums/task.importances';
import { EnumStatus } from 'src/app/core/enums/task.statuses';
import { DatePipe } from '@angular/common';
import { TaskPostData } from 'src/app/core/models/task.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() hookTaskData: EventEmitter<TaskPostData> = new EventEmitter<TaskPostData>();
  @Input() task: TaskView;
  @Input() tasks: TaskView[] = [];
  @Input() formShown: boolean;
  @Input() resetForm: boolean;
  @Input() btnLabel: string;
  @Input() styleClass: string;
  currentDate = new Date();
  form: FormGroup;
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
  ) { }

  ngOnInit(): void {
    this._initForm();
  }

  handleSubmit(): void {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.hookTaskData.emit(this.form.value);

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

  get name(): AbstractControl {
    return this.form.get('name') as AbstractControl;
  }

  get date(): AbstractControl {
    return this.form.get('date') as AbstractControl;
  }

  get today(): string | null {
    return this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  private _initForm(): void {
    this.form = this._fb.group(
      {
        name: [this.task ? this.task.name : '', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        date: [this.task ? this.task.date : '', [Validators.required]],
        status: [this.task ? this.task.status : EnumStatus.pending, []],
        importance: [this.task ? this.task.importance : EnumImportance.minor, []]
      });
  }
}
