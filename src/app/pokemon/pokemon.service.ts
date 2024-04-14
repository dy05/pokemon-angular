import { Injectable } from '@angular/core';
import { POKEMONS } from './api-pokemons';
import { Pokemon } from './pokemon.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, map, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonList = new BehaviorSubject<Pokemon[]|null>(null);
  pokemonList$ = this.pokemonList.asObservable();
  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<Pokemon[]>{
      return this.http.get<Pokemon[]>('api/pokemons').pipe(
          map(pokemons => pokemons)
      );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      map(pokemon => pokemon)
    );
  }

  addPokemon(pokemon: Pokemon): Observable<number|null> {
    pokemon.id = (new Date()).getTime();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}) 
    }

    return this.http.post<boolean>('api/pokemons', pokemon, httpOptions).pipe(
      map(response => response ? pokemon.id : null)
    );
  }
  updatePokemon(pokemon: Pokemon): Observable<Pokemon|null> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.put<boolean>('api/pokemons', pokemon, httpOptions).pipe(
      map(response => response ? pokemon : null)
    );
  }
  deletePokemon(pokemonId: number): Observable<boolean> {
    return this.http.delete<boolean>(`api/pokemons/${pokemonId}`).pipe(
      map(response => response)
    );
  }

  getTypesList(): string[] {
    return [
      'Feu', 
      'Eau', 
      'Plante',
      'Insecte',
      'Normal',
      'Vol',
      'Poison',
      'Fée',
      'Psy',
      'Electrik',
      'Combat'
    ]
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length) {
      return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
          map(pokemons => {
            this.pokemonList.next(pokemons);
            return pokemons;
          })
      );
    }

    this.pokemonList.next(null);
    return (new BehaviorSubject([])).asObservable();
  }
}
