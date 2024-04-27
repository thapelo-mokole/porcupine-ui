import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUpdatePermissionDto, CreateUpdatePermissionResponseDto, PermissionResponseDto } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = environment.url + '/Permission';

  constructor(private http: HttpClient) { }

  getPermissions(): Observable<any> {
    let url = this.apiUrl + '/GetAllList';
    return this.http.get<any>(url);
  }

  addPermission(permission: CreateUpdatePermissionDto): Observable<CreateUpdatePermissionResponseDto> {
    return this.http.post<CreateUpdatePermissionResponseDto>(this.apiUrl, permission);
  }

  updatePermission(id: string, permission: CreateUpdatePermissionDto): Observable<CreateUpdatePermissionResponseDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<CreateUpdatePermissionResponseDto>(url, permission);
  }

  deletePermission(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
