export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  nombre?: string;

  createdAt?: string;
  updatedAt?: string;
}
