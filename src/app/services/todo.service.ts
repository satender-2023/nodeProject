// todo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/getAll`);
  }

  addTodo(todoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/create`, todoData);
  }

  updateTodo(id: number, todoData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/user/update/${id}`, todoData);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/delete/${id}`);
  }

   // methods for additional details
   saveAdditionalDetails(id: number, additionalDetails: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/additionalDetails/${id}`, { additionalDetails });
  }

  updateAdditionalDetails(id: number, additionalDetails: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/user/additionalDetails/${id}`, { additionalDetails });
  }

  getAdditionalDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/additionalDetails/${id}`);
  }
}
