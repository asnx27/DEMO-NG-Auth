import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private readonly baseUrl =
    'https://task-react-auth-backend.eapi.joincoded.com/api';

  constructor(private http: HttpClient) {}

  createNote(note: {
    title: string;
    body: string;
    topics: string[];
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/notes`, note);
  }

  getNotes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notes`);
  }

  getNoteById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/notes/${id}`);
  }
}
