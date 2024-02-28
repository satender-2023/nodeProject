// todo.component.ts

import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  task = '';
  description = '';
  date = '';
  additionalDetails = '';
  todo: any[] = [];
  editIndex = -1;
  todoForm!: FormGroup;


  constructor(private todoService: TodoService, private fb: FormBuilder) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      task: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });

    this.getAllTodos();
    this.initializeOriginalDetails();
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe(
      (data: any) => {
        this.todo = data.data;
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }




  addTodo() {
    if (this.editIndex === -1) {
      this.todoService.addTodo(this.todoForm.value).subscribe(
        (resultData: any) => {
          console.log(resultData);
          this.resetForm();
          this.getAllTodos();
        },
        (error) => {
          console.error('Error adding todo:', error);
        }
      );
    } else {
      const todoId = this.todo[this.editIndex]._id;
      this.todoService.updateTodo(todoId, this.todoForm.value).subscribe(
        () => {
          this.resetForm();
          this.getAllTodos();
        },
        (error) => {
          console.error('Error updating todo:', error);
        }
      );
    }
  }

  submitAdditionalDetails(todoItem: any): void {
    // You may want to implement the logic to save additional details to the backend
    // Call the service method to save/update additional details
    this.todoService.saveAdditionalDetails(todoItem._id, todoItem.additionalDetails).subscribe(
      (result: any) => {
        // Handle the result if needed
        console.log(result);
      },
      (error) => {
        console.error('Error saving additional details:', error);
      }
    );
  }

  updateAdditionalDetails(todoItem: any): void {
    // You may want to implement the logic to update additional details to the backend
    // Call the service method to save/update additional details
    this.todoService.updateAdditionalDetails(todoItem._id, todoItem.additionalDetails).subscribe(
      (result: any) => {
        // Handle the result if needed
        console.log(result);
      },
      (error) => {
        console.error('Error updating additional details:', error);
      }
    );
  }

  toggleAccordion(index: number): void {
    this.todo[index].showDetails = !this.todo[index].showDetails;

    // Assuming you want to load additionalDetails when the accordion is toggled
    if (this.todo[index].showDetails) {
      this.loadAdditionalDetails(this.todo[index]);
    }
  }

  loadAdditionalDetails(todoItem: any): void {
    // Assuming you have a service method to fetch additionalDetails
    this.todoService.getAdditionalDetails(todoItem._id).subscribe(
      (result: any) => {
        // Update the todoItem with the fetched additionalDetails
        todoItem.additionalDetails = result.additionalDetails;
      },
      (error: any) => { // or (error: Error) => {
        console.error('Error fetching additional details:', error);
      }
    );
  }
  
  initializeOriginalDetails(): void {
    // Initialize the original details for each todo item
    this.todo.forEach(item => (item.originalDetails = item.additionalDetails));
  }

  editTodo(index: number) {
    this.editIndex = index;
    const selectedTodo = this.todo[index];
    this.todoForm.patchValue(selectedTodo);
    window.scrollTo(0, 0);
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
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this to-do item?');

    if (confirmDelete) {
      // User clicked "OK" in the confirmation popup
      const todoId = this.todo[index]._id; // Assuming you have an _id field in your todos
      this.todoService.deleteTodo(todoId).subscribe(
        () => {
          this.getAllTodos(); // Refresh the list after deleting
        },
        (error) => {
          console.error('Error deleting todo:', error);
        }
      );
    } else {
      // User clicked "Cancel" in the confirmation popup
      console.log('Deletion canceled.');
    }
  }


  resetForm() {
    this.todoForm.reset();
    this.editIndex = -1;
  }
}

