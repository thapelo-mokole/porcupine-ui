import { BaseModel } from "./base.model";

export interface User extends BaseModel {
  userName: string;
  email: string;
  name: string;
  surname: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
}
