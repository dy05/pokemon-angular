import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.models';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import {debounceTime, distinctUntilChanged, Subject, Subscription, switchMap} from "rxjs";

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styles: [
  ]
})
export class ListPokemonComponent implements OnInit, OnDestroy {
  pokemonSubscription: Subscription = new Subscription();
  pokemonList: Pokemon[]|undefined = [];
  filteredPokemonList: Pokemon[]|undefined = [];
  pokemonSelected: Pokemon|undefined;
  searchTerms = new Subject<string>();

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(){
      this.pokemonService.getPokemonList()
          .subscribe({
              next: (pokemons) => {
                  this.pokemonList = pokemons;
                  this.filteredPokemonList = pokemons;
              },
              error: (error) => {
                  console.log(error)
              }
          });

      this.pokemonSubscription = this.pokemonService.pokemonList$.subscribe(
          (pokemons) => {
              if (pokemons) {
                  this.filteredPokemonList = pokemons;
              } else {
                  this.filteredPokemonList = this.pokemonList;
              }
          });
  }

  ngOnDestroy() {
      if (this.pokemonSubscription) {
          this.pokemonSubscription.unsubscribe();
      }
  }

  goToPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemon', pokemon.id]);
    /* /pokemon/6 */
  }

  goToAddPokemon(){
    this.router.navigate(['/add/pokemon']);
  }
}
