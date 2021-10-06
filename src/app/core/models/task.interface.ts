export interface TaskPostData {
  name: string;
  date: string;
  status: string;
  importance: string;
};
export interface TaskView extends Readonly<TaskPostData> {
  readonly id: number;
};