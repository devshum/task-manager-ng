
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

  addTask(task: TaskPostData): Observable<TaskView> {
    return this._http.post<TaskView>(`${this._apiUrl}/tasks`, task);
  }

  removeTask(taskId: number): Observable<TaskView> {
    return this._http.delete<TaskView>(`${this._apiUrl}/tasks/${taskId}`);
  }

  editTask(id: number, newTask: TaskView): Observable<TaskView>  {
    return this._http.patch<TaskView>(`${this._apiUrl}/tasks/${id}`, newTask);
  }
}
