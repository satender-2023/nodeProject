import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8000/api/todos';
  constructor(private http: HttpClient) {}
  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  addTodo(todo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo);
  }
  
  updateTodo(id: string, todo: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, todo);
  }
  
  deleteTodo(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  
}
