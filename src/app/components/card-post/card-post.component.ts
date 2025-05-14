
import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.css']
})
export class CardPostComponent {
  @Input() post!: Post;
  @Input() user?: User;

  constructor(private router: Router) { }

  navigateToPost(postId: number): void {
    this.router.navigate(['/post', postId]);
  }

  navigateToUser(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
}