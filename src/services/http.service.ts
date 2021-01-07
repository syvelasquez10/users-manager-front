import axios from "axios";
import { Task, User } from "../components/shared/models";

export const urlBack =
  "https://3xp075g60j.execute-api.us-east-1.amazonaws.com/v1/";

export const getUsers = (): Promise<User[]> => {
  return axios.get(urlBack + "users/").then((res) => res.data.body);
};

export const deleteUser = (id: string): Promise<any> => {
  return axios.delete(urlBack + "users/" + id);
};

export const updateUser = (user: User): Promise<any> => {
  return axios.patch(urlBack + "users/" + user.id, user);
};

export const createUser = (name: string): Promise<any> => {
  return axios.post(urlBack + "users/", { name: name });
};

export const getTasks = (userId: string): Promise<Task[]> => {
  return axios.get(urlBack + "users/" + userId + "/user_tasks/").then((res) => res.data);
};

export const deleteTask = (id: string): Promise<any> => {
  return axios.delete(urlBack + "user_tasks/" + id);
};

export const updateTask = (task: Task): Promise<any> => {
  return axios.patch(urlBack + "user_tasks/" + task.id, task);
};

export const createTask = (task: Task): Promise<any> => {
  return axios.post(urlBack + "users/" + task.user_id + "/user_tasks/", task);
};
