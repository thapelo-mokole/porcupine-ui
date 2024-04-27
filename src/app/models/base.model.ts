export interface BaseResponseDto {
  id: string;
  createdBy: string;
  createdOn: Date;
  updatedBy?: string;
  updatedOn?: Date;
}
