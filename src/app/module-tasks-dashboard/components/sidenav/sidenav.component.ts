import { FilterOptionsService } from './../../../core/services/filter-options/filter-options.service';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EnumStatus } from 'src/app/core/enums/task.statuses';
import { EnumData } from 'src/app/core/enums/task.data';
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
  public dataOptions: string[] = [
    EnumData.oldest,
    EnumData.newest
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


    if(this.form.value.data === EnumData.newest) {
      this.form.value.data = '-createdAt';
    }

    if(this.form.value.data === EnumData.oldest) {
      this.form.value.data = 'createdAt';
    }

    this._optionsService.setOptions(this.form.value);
  }

  resetFilter() {
    this.form.reset({
      status: [EnumStatus.all, []],
      importance: [EnumImportance.all, []],
      data: [EnumData.oldest, []]
    });

    this._optionsService.reset();

  }

  private _initForm(): void {
    this.form = this._fb.group(
      {
        status: [EnumStatus.all, []],
        importance: [EnumImportance.all, []],
        data: [EnumData.oldest, []]
      });
  }
}
