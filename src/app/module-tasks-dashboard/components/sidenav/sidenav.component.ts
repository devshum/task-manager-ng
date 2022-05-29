import { FilterOptionsService } from './../../../core/services/filter-options/filter-options.service';
import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EnumStatus } from 'src/app/core/enums/task.statuses';
import { EnumIssue } from 'src/app/core/enums/task.issue';
import { EnumImportance } from 'src/app/core/enums/task.importances';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {
  @Input() sideNavShown = false;
  public form: FormGroup;
  public statusOptions: string[] = [
    EnumStatus.all,
    EnumStatus.pending,
    EnumStatus.closed,
    EnumStatus.inProgress
  ];
  public importanceOptions: string[] = [
    EnumImportance.all,
    EnumImportance.minor,
    EnumImportance.normal,
    EnumImportance.critical
  ];
  public issueOptions: string[] = [
    EnumIssue.oldest,
    EnumIssue.newest
  ];
  constructor(
    private _fb: FormBuilder,
    private _optionsService: FilterOptionsService
  ) { }

  ngOnInit(): void {
    this._initForm();
  }

  public handleFilterSubmit(): void {
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

    this._optionsService.setOptions(this.form.value);
  }

  resetFilter() {
    this.form.reset({
      status: [EnumStatus.all, []],
      importance: [EnumImportance.all, []],
      issue: [EnumIssue.oldest, []]
    });

    this._optionsService.reset();

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
