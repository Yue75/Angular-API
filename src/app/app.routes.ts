import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'user/:id', component: UserProfileComponent },
  { path: '**', redirectTo: '' } // Redirect to home for any invalid routes
];