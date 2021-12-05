import { TaskFilterParams } from '../../../core/models/filter.interface';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EnumStatus } from 'src/app/core/enums/task.statuses';
import { EnumImportance } from 'src/app/core/enums/task.importances';
import { EnumDate } from 'src/app/core/enums/task.date';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() sideNavShown = false;
  @Output() selectStatus: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectImportance: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterOptions: EventEmitter<TaskFilterParams> = new EventEmitter<TaskFilterParams>();
  form: FormGroup;
  statusOptions: string[] = [
    EnumStatus.all,
    EnumStatus.pending,
    EnumStatus.closed,
    EnumStatus.inProgress
  ];
  importanceOptions: string[] = [
    EnumImportance.all,
    EnumImportance.minor,
    EnumImportance.normal,
    EnumImportance.critical
  ];
  dateOptions: string[] = [
    EnumDate.default,
    EnumDate.oldest,
    EnumDate.newest
  ];
  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._initForm();
  }

  handleFilterSubmit(): void {
    if(this.form.value.importance === EnumImportance.all) {
      this.form.value.importance = '';
    }

    if(this.form.value.status === EnumStatus.all) {
      this.form.value.status = '';
    }

    if(this.form.value.date === EnumDate.newest) {
      this.form.value.date = 'date';
    }

    if(this.form.value.date === EnumDate.oldest) {
      this.form.value.date = '-date';
    }

    if(this.form.value.date === EnumDate.default) {
      this.form.value.date = '-createdAt';
    }

    this.filterOptions.emit(this.form.value);
  }

  resetFilter() {
    this.form.reset({
      status: [EnumStatus.all, []],
      importance: [EnumImportance.all, []],
      date: [EnumDate.default, []]
    });

    this.filterOptions.emit({status: '', importance: '', date: '-createdAt'});
  }

  private _initForm(): void {
    this.form = this._fb.group(
      {
        status: [EnumStatus.all, []],
        importance: [EnumImportance.all, []],
        date: [EnumDate.default, []]
      });
  }
}
