import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string = '';

  constructor(private router: Router) {}

  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = (name == 'pikachu' && password == 'pikachu');

    return of(isLoggedIn).pipe(
      delay(1000),
      map(isLoggedIn => this.isLoggedIn = isLoggedIn)
    );
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/login'])
  }
}