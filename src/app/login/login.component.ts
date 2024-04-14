import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: `login.component.html`,
  styles: [
  ]
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    'name': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required),
  })
  message: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(){}

  setMessage() {
    if(this.authService.isLoggedIn){
      this.message = "Vous êtes connecté !"
    }else{
      this.message = ' Identifiant ou mot de passe incorrect'
    }
  }

  login(){
    this.message = 'Tentative de connexion en cours...';
    const name = this.loginForm?.get('name')?.value
    const password = this.loginForm?.get('password')?.value

    this.authService.login(name, password).subscribe({
      next: (isLoggedIn)=> {
        this.setMessage();
        if(isLoggedIn){
          this.router.navigate(['/pokemons']);
        } else {
          this.loginForm?.reset();
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.log(err)
      }
    })

  }


}
