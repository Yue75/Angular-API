import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],

  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/">JSONPlaceholder Social</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <main>
      <router-outlet></router-outlet>
    </main>
    
    <footer class="bg-light text-center text-muted py-3 mt-5">
      <div class="container">
        <p>Angular Demo App using JSONPlaceholder API</p>
      </div>
    </footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'jsonplaceholder-social';
}