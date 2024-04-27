import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private apiUrl = environment.url + '/Lookup';

  constructor(private http: HttpClient) { }

  getAllPermissions(): Observable<any> {
    let url = this.apiUrl + '/GetAllPermissions';
    return this.http.get<any>(url);
  }

  getAllGroups(): Observable<any> {
    let url = this.apiUrl + '/GetAllGroups';
    return this.http.get<any>(url);
  }

}
