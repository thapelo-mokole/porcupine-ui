import { BaseResponseDto } from "./base.model";
import { PermissionResponseDto } from "./permission.model";

export interface GroupDto {
  shortDescription: string;
  longDescription: string;
}

export interface GroupResponseDto extends BaseResponseDto {
  shortDescription: string;
  longDescription: string;
  permissions: PermissionResponseDto[];
}

export interface CreateUpdateGroupDto {
  shortDescription: string;
  longDescription: string;
  permissions: string[];
}

export interface CreateUpdateGroupResponseDto extends BaseResponseDto{
  shortDescription: string;
  longDescription: string;
}
