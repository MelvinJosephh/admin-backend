import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { PostsService } from '../../services/posts.service';
import { CategoryWithId } from '../../models/category';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AngularEditorModule, FormsModule, RouterModule],
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  imgSrc: string = './assets/img-holder.jpg';
  selectedImg: File | null = null;
  categories: Array<CategoryWithId> = [];
  postForm: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: [null], // Optional, so no Validators.required
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe(data => {
      this.categories = data;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged(event: any): void {
    const title = event.target?.value || '';
    const permalink = title.replace(/\s/g, '-').toLowerCase();
    this.postForm.get('permalink')?.setValue(permalink);
  }

  showPreview(event: any): void {
    const file = event.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = e.target?.result as string || this.imgSrc;
      };
      reader.readAsDataURL(file);
      this.selectedImg = file;
      this.postForm.patchValue({ postImg: file }); // Update the form control value
      this.postForm.get('postImg')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    let splitted = this.postForm.value.category.split('-');
    // console.log(splitted);

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    console.log(postData);

    this.postService.uploadImage(this.selectedImg, postData);
    this.postForm.reset();
    this.imgSrc = './assets/img-holder.jpg';
  }

 
}
