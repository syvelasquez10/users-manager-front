import axios from "axios";
import { User } from "../components/shared/models";

export const urlBack =
  "";

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
