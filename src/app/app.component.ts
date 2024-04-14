import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  isLoggedIn:boolean|undefined;

  constructor( private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }
  
  logout() {
    this.authService.logout();
  }

  goToPokemonList() {
    this.router.navigate(['/pokemons']);
  }
}
