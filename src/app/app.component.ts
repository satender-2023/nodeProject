import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm!: FormGroup;
  file: File | null = null; 
  formData: any;
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      course: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required, Validators.minLength(2)]],
      date: ['', Validators.required],
      score: ['', [Validators.required, Validators.minLength(2)]],
      // file:['', Validators.required],
    });
  }
  submitted = false;
  onSubmit(form: FormGroup) {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
  
    // Process the form data and perform your submission logic here.
  
    // After successful submission, reset the form:
    this.myForm.reset();
  
    // Optionally, you can also clear the image preview:
    this.imageSrc = '';
  
    alert("Form submitted successfully");
  }
  


  imageSrc: string = ''; 

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      if (file.type.startsWith('image/')) {
        this.status = "initial";
        this.file = file;
        this.displayImagePreview(file);
      } else {
      }
    }
  }

  displayImagePreview(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };

   
    reader.readAsDataURL(file);
  }
  
}
