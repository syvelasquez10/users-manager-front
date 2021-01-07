export interface User {
  id?: string;
  key?: number;
  name: string;
}

export interface Task {
  id?: string;
  key?: number;
  description: string;
  state: string;
  user_id: string;
}