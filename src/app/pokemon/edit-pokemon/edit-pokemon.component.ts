import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <div *ngIf="pokemon">
      <h2 class="text-center">{{ pokemon.name }}</h2>
      <div class="text-center">
        <img [src]="pokemon.picture">
      </div>
      <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
    </div>
  `,
  styles: [
  ]
})
export class EditPokemonComponent {
  pokemon: Pokemon|undefined = new Pokemon();

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit() {
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    if(pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId).subscribe({
        next: (pokemon) => {
          this.pokemon = pokemon
        },
        error: (err) => {
          console.log(err)
        },
      })
    }
  }
}
