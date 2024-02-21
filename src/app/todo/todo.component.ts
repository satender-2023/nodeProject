import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  task = '';
  description = '';
  date = '';
  todo: any[] = [];
  editIndex = -1; // Initialize to -1 indicating no item is being edited or not in edit mode

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.addTodo()
  }
// Update addTodo, editTodo, and deleteTodo methods to use the TodoService
addTodo() {
  if (this.task) {
    const newTodo = { task: this.task, description: this.description, date: this.date };
    this.todoService.addTodo(newTodo).subscribe(
      (response) => {
        this.todo = response;
        console.log(response);
        
        // this.clearFields();
      },
      (error: any) => console.error('Error adding todo:', error)
    );
  }
}

editTodo(index: number) {
  this.editIndex = index;
  this.task = this.todo[index].task;
  this.description = this.todo[index].description;
  this.date = this.todo[index].date;
}

deleteTodo(value: number) {
  const todoId = this.todo[value]._id;
  this.todoService.deleteTodo(todoId).subscribe(
    () => {
      this.todo.splice(value, 1);
      console.log('Deleted');
    },
    (error: any) => console.error('Error deleting todo:', error)
  );
}
}