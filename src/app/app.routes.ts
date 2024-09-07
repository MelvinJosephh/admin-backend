
// app.routes.ts
import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './services/auth.guard';


export const routes: Routes = [
  { path: 'categories', component: CategoriesComponent, canActivate: [authGuard]},
  { path: '', component: DashboardComponent , canActivate: [authGuard]},
  { path: 'all-posts', component: AllPostComponent , canActivate: [authGuard]},
  { path: 'new-post', component: NewPostComponent , canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
