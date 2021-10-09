import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskView, TaskPostData } from 'src/app/core/models/task.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TaskQueryParams } from '../models/task-query.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TasksDashboardService {
  private _apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  getTasks(query?: Partial<TaskQueryParams>): Observable<TaskView[]> {
    const options = {
      params: new HttpParams()
        .set('importance', query?.importance || '')
        .set('status', query?.status || '')
        .set('sort', query?.sort || '')
    };

    return this._http.get<TaskView[]>(`${this._apiUrl}/tasks`, options);
  }

  addTask(task: TaskPostData): Observable<TaskView> {
    return this._http
      .post<TaskView>(`${this._apiUrl}/tasks`, task);
  }

  removeTask(task: TaskView): Observable<TaskView> {
    return this._http
      .delete<TaskView>(`${this._apiUrl}/tasks/${task.id}`);
  }
}
