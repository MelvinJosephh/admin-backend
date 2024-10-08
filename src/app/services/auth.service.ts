import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean | undefined= false;

  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) { }

  login(email: string, password: string){
    this.afAuth.signInWithEmailAndPassword(email, password).then(()=>{
      this.loadUser();
      this.toastr.success('Logged In Successfully');
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['/']);
    }).catch(e=>{
      this.toastr.warning(e);
    });

  }
  loadUser(){
    this.afAuth.authState.subscribe((user: any)=>{
      localStorage.setItem('user', JSON.stringify(user));

    })
  }

logOut(){
this.afAuth.signOut().then(()=>{
  this.toastr.success('User Logged Out Successfully');
  localStorage.removeItem('user');
  this.router.navigate(['/login']);
  this.loggedIn.next(false);
  this.isLoggedInGuard = false;
});
}

isLoggedIn() {
  return this.loggedIn.asObservable();
}


}

