import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { CommentService } from '../../services/comment.service';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { Comment } from '../../models/comment.model';
import { CommentCardComponent } from '../../components/comment-card/comment-card.component';
import { forkJoin, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CommentCardComponent],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post!: Post;
  user!: User;
  comments: Comment[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const postId = Number(params.get('id'));
        if (isNaN(postId)) {
          throw new Error('Invalid post ID');
        }
        
        return this.postService.getPostById(postId);
      }),
      switchMap(post => {
        this.post = post;
        
        return forkJoin({
          user: this.userService.getUserById(post.userId),
          comments: this.commentService.getCommentsByPostId(post.id)
        });
      })
    ).subscribe({
      next: (data) => {
        this.user = data.user;
        this.comments = data.comments;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading post details:', err);
        this.error = 'Failed to load post details.';
        this.loading = false;
      }
    });
  }

  navigateToUser(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
}