export interface User {
  id?: string;
  key?: number;
  name: string;
}

export enum TaskState {
  'done',
  'to do'
};

export interface Task {
  id?: string;
  key?: number;
  description: string;
  state: TaskState;
  user_id: string;
}