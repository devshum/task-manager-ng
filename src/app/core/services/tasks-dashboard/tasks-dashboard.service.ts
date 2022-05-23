
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskView, TaskPostData } from 'src/app/core/models/task.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TaskQueryParams } from '../../models/taskQuery.interface';
import { TaskResponse } from '../../models/taskResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class TasksDashboardService {
  tasks$: Subject<string> = new Subject<string>();
  tasksObserver$ = this.tasks$.asObservable();

  private _apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  getTasks(query?: Partial<TaskQueryParams>): Observable<TaskResponse> {
    const options = {
      params: new HttpParams()
        .set('importance', query?.importance || '')
        .set('status', query?.status || '')
        .set('sort', query?.sort || '')
        .set('page', query?.page || '')
        .set('limit', query?.limit || '')
    };

    return this._http.get<TaskResponse>(`${this._apiUrl}/tasks`, options);
  }

  addTask(task: TaskPostData): void {
    this._http.post<TaskView>(`${this._apiUrl}/tasks`, task)
              .subscribe(() => this.tasks$.next('add'));
  }

  removeTask(taskId: number): void {
    this._http.delete<TaskView>(`${this._apiUrl}/tasks/${taskId}`)
              .subscribe(() => this.tasks$.next('delete'));
  }

  editTask(id: number, newTask: TaskView): void {
    this._http.patch<TaskView>(`${this._apiUrl}/tasks/${id}`, newTask)
              .subscribe(() => this.tasks$.next('edit'));
  }
}
