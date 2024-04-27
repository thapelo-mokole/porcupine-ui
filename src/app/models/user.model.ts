import { BaseResponseDto } from "./base.model";
import { GroupResponseDto } from "./group.model";

export interface UserDto {
  userName: string;
  email: string;
  name: string;
  surname: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
}

export interface UserResponseDto extends BaseResponseDto {
  userName: string;
  email: string;
  name: string;
  surname: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  groups: GroupResponseDto[];
}


export interface CreateUpdateUserDto {
  userName: string;
  email: string;
  name: string;
  surname: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  groups: string[];
}


export interface CreateUpdateUserResponseDto extends BaseResponseDto {
  userName: string;
  email: string;
  name: string;
  surname: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
}
