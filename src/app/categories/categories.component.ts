import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../services/categories.service';
import { Category, CategoryWithId } from '../models/category';
import { ModalComponent } from '../shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray: Array<CategoryWithId> = [];
  formCategory: string | undefined;
  formStatus: string = 'Add';
  categoryId: string | undefined;

  constructor(private categoryService: CategoriesService, private dialog: MatDialog) { }

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

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      formData.reset();
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }

    // Removed duplicate call to saveData
  }

  onEdit(category: any, id: any) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: any) {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.categoryService.deleteData(id);
      }
    });
  }
}
