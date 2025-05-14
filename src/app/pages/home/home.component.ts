import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { CardPostComponent } from '../../components/card-post/card-post.component';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardPostComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  users: Map<number, User> = new Map<number, User>();
  loading: boolean = true;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      posts: this.postService.getAllPosts(),
      users: this.userService.getUsers()
    }).pipe(
      map(result => {
        // Store all users in a map for quick access
        result.users.forEach(user => {
          this.users.set(user.id, user);
        });
        
        // Take only the first 10 posts
        return result.posts.slice(0, 10);
      })
    ).subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.loading = false;
      }
    });
  }

  getUserForPost(userId: number): User | undefined {
    return this.users.get(userId);
  }
}