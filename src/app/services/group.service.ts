import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUpdateGroupDto, CreateUpdateGroupResponseDto, GroupResponseDto } from '../models/group.model';

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

  addGroup(group: CreateUpdateGroupDto): Observable<CreateUpdateGroupResponseDto> {
    return this.http.post<CreateUpdateGroupResponseDto>(this.apiUrl, group);
  }

  updateGroup(id: string, group: CreateUpdateGroupDto): Observable<CreateUpdateGroupResponseDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<CreateUpdateGroupResponseDto>(url, group);
  }

  deleteGroup(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
