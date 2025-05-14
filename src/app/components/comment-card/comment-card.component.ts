import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  @Input() comment!: Comment;

  constructor(private router: Router) { }
}

