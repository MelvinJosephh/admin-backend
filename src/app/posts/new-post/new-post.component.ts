import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { PostsService } from '../../services/posts.service';
import { CategoryWithId } from '../../models/category';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AngularEditorModule, FormsModule, RouterModule],
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  imgSrc: string = '/img-holder.jpg';
  selectedImg: File | null = null;
  categories: Array<CategoryWithId> = [];
  postForm!: FormGroup;
  post: any;
  formStatus: string = 'Add New';
  docId: any;


  ngOnInit(): void {
    this.categoriesService.loadData().subscribe(data => {
      this.categories = data;
    });
  }

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: [null],
      content: ['', Validators.required],
    });
  
    this.route.queryParams.subscribe(val => {
      if (this.docId) {
        this.docId = val['id'];
        this.postService.loadPostData(val['id']).subscribe(post => {
          if (post) {
            this.post = post;
            this.postForm.patchValue({
              title: post.title,
              permalink: post.permalink,
              excerpt: post.excerpt,
              category: `${post.category.categoryId}-${post.category.category}`,
              postImg: post.postImgPath,
              content: post.content
            });
            this.imgSrc = this.post.postImgPath;
            this.formStatus = 'Edit';
          }
        });
      }
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
    const [categoryId, category] = this.postForm.value.category.split('-');
  
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId,
        category
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    };
  
    this.postService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.imgSrc = '/img-holder.jpg';
  }
  

}
