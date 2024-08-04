import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent {

}
