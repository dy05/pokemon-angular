import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.models';
import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-add-pokemon',
//   templateUrl: `add-pokemon.component.html`,
//   styles: [
//   ]
// })

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <div *ngIf="pokemon">
      <h2 class="text-center">Ajouter un pokemon</h2>
      <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
    </div>
  `,
  styles: [
  ]
})
export class AddPokemonComponent {
  pokemon: Pokemon|undefined = new Pokemon();

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}
}
