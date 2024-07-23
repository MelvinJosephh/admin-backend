
// categories.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../services/categories.service';
import { Category, CategoryWithId } from '../models/category';



@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryArray: Array<CategoryWithId> = [];

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    // Initialize any data if needed
    this.categoryService.loadData().subscribe((data: Array<CategoryWithId>) => {
      console.log(data);
      this.categoryArray = data;
    })
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category
    }
    this.categoryService.saveData(categoryData);
  }
}
