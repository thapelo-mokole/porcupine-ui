import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = environment.url + '/Group';

  constructor(private http: HttpClient) { }

  getGroups(): Observable<any> {
    let url = this.apiUrl + '/GetAllList';
    return this.http.get<any>(url);
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, group);
  }

  updateGroup(group: Group): Observable<Group> {
    const url = `${this.apiUrl}/${group.id}`;
    return this.http.put<Group>(url, group);
  }

  deleteGroup(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
