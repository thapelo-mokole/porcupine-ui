import { BaseModel } from "./base.model";

export interface Group extends BaseModel {
  shortDescription: string;
  longDescription: string;
}
