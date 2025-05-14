import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { CardPostComponent } from '../../components/card-post/card-post.component';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, CardPostComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!: User;
  posts: Post[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const userId = Number(params.get('id'));
        if (isNaN(userId)) {
          throw new Error('Invalid user ID');
        }
        
        return forkJoin({
          user: this.userService.getUserById(userId),
          posts: this.postService.getPostsByUserId(userId)
        });
      })
    ).subscribe({
      next: (data) => {
        this.user = data.user;
        this.posts = data.posts.slice(0, 10); // Limit to 10 posts as per requirements
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
        this.error = 'Failed to load user profile.';
        this.loading = false;
      }
    });
  }
}