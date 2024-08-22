import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent implements OnInit {

  postArray: Array<{ id: string, data: Post }> | undefined;

constructor(private postsService: PostsService){}

  ngOnInit(): void {
    this.postsService.loadData().subscribe(val => {
      console.log(val);
      this.postArray = val;
    })
  }





}
