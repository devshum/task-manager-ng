import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public tasks$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }
}
