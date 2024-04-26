import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission.model';
import { environment } from 'src/environments/environment';

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

  addPermission(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.apiUrl, permission);
  }

  updatePermission(permission: Permission): Observable<Permission> {
    const url = `${this.apiUrl}/${permission.id}`;
    return this.http.put<Permission>(url, permission);
  }

  deletePermission(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
