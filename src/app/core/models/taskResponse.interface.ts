import { TaskView } from './task.interface';

export interface TaskResponse {
  total: number;
  limit: number;
  page: number;
  result: TaskView[];
}
