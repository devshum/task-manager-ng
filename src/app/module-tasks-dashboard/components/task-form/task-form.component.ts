import { SidenavService } from './../../../core/services/sidenav/sidenav.service';
import { FormService } from './../../../core/services/form/form.service';
import { TaskView } from './../../../core/models/task.interface';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { fadeCommon } from './../../../core/animations/animations';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  animations: [fadeCommon],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskFormComponent implements OnInit {
  @Input() tasks: TaskView[] = [];
  @Input() totalTasks: number;
  public isFormShown$: Observable<boolean>;
  public isSideNavShown = false;

  constructor(
    private _formService: FormService,
    private _sidenavService: SidenavService
  ) {}

  get suffix(): string {
    return this.totalTasks > 1 ? 'tasks' : 'task';
  }

  ngOnInit(): void {
    this.isFormShown$ = this._formService.form$;
  }

  public toggleForm(): void {
    this._formService.toggleForm();
  }

  public toggleSidenav(): void {
    this._sidenavService.toggleSidenav();
  }
}
