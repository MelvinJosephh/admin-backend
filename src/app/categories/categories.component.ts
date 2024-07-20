import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
ngOninit(): void {

}
  
onSubmit(formData: any) {
console.log (formData);
}

}
