import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUpdateUserDto, CreateUpdateUserResponseDto, UserResponseDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.url + '/User';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    let url = this.apiUrl + '/GetAllList';
    return this.http.get<any>(url);
  }

  addUser(user: CreateUpdateUserDto): Observable<CreateUpdateUserResponseDto> {
    return this.http.post<CreateUpdateUserResponseDto>(this.apiUrl, user);
  }

  updateUser(id: string, user: CreateUpdateUserDto): Observable<CreateUpdateUserResponseDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<CreateUpdateUserResponseDto>(url, user);
  }

  deleteUser(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
