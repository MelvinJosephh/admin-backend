import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService ){}

  userEmail: string | undefined;
  isLoggedIn$: Observable<boolean> | undefined;


// ngOnInit(): void {
//   console.log( JSON.parse(localStorage.getItem('user')).email);
  
// }
ngOnInit(): void {
  const user = localStorage.getItem('user') ?? '{}'; // Fallback to an empty object
  const parsedUser = JSON.parse(user);
 this.userEmail = parsedUser.email;
 this.isLoggedIn$ = this.authService.isLoggedIn();
}

onLogout() {
  this.authService.logOut();
  }
  

}
