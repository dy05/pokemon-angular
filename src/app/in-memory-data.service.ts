import { Injectable } from '@angular/core';
import { POKEMONS } from './pokemon/api-pokemons';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  constructor() { }
  createDb(){
    const pokemons = POKEMONS
    return {pokemons};
  }
}