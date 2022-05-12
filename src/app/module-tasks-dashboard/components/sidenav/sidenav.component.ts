import { TaskFilterParams } from '../../../core/models/filter.interface';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EnumStatus } from 'src/app/core/enums/task.statuses';
import { EnumIssue } from 'src/app/core/enums/task.issue';
import { EnumImportance } from 'src/app/core/enums/task.importances';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() sideNavShown = false;
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
  issueOptions: string[] = [
    EnumIssue.oldest,
    EnumIssue.newest
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


    if(this.form.value.issue === EnumIssue.newest) {
      this.form.value.issue = '-issue';
    }

    if(this.form.value.issue === EnumIssue.oldest) {
      this.form.value.issue = 'issue';
    }

    this.filterOptions.emit(this.form.value);
  }

  resetFilter() {
    this.form.reset({
      status: [EnumStatus.all, []],
      importance: [EnumImportance.all, []],
      issue: [EnumIssue.oldest, []]
    });

    this.filterOptions.emit({status: '', importance: '', issue: '-issue'});
  }

  private _initForm(): void {
    this.form = this._fb.group(
      {
        status: [EnumStatus.all, []],
        importance: [EnumImportance.all, []],
        issue: [EnumIssue.oldest, []]
      });
  }
}
