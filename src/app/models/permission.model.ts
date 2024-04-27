import { BaseResponseDto } from "./base.model";

export interface PermissionDto  {
  shortDescription: string;
}

export interface PermissionResponseDto extends BaseResponseDto {
  shortDescription: string;
}


export interface CreateUpdatePermissionDto {
  shortDescription: string;
}


export interface CreateUpdatePermissionResponseDto extends BaseResponseDto {
  shortDescription: string;
}
