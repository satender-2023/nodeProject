// todo.component.ts

import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  task = '';
  description = '';
  date = '';
  todo: any[] = [];
  editIndex = -1;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe(
      (data: any[]) => {
        this.todo = data;
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  addTodo() {
    const todoData = { task: this.task, description: this.description, date: this.date };
    this.todoService.addTodo(todoData).subscribe(
      () => {
        this.getAllTodos(); // Refresh the list after adding
        this.resetForm();
      },
      (error) => {
        console.error('Error adding todo:', error);
      }
    );
  }

  editTodo(index: number) {
    this.editIndex = index;
    // You may want to set the values in the form for editing based on this.todo[index]
  }

  updateTodo() {
    const todoData = { task: this.task, description: this.description, date: this.date };
    const todoId = this.todo[this.editIndex]._id; // Assuming you have an _id field in your todos
    this.todoService.updateTodo(todoId, todoData).subscribe(
      () => {
        this.getAllTodos(); // Refresh the list after updating
        this.resetForm();
      },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  }

  deleteTodo(index: number) {
    const todoId = this.todo[index]._id; // Assuming you have an _id field in your todos
    this.todoService.deleteTodo(todoId).subscribe(
      () => {
        this.getAllTodos(); // Refresh the list after deleting
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }

  resetForm() {
    this.task = '';
    this.description = '';
    this.date = '';
    this.editIndex = -1;
  }
}
