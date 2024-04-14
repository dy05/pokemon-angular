import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.models';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: 'pokemon-form.component.html',
  styles: []
})
export class PokemonFormComponent {
  @Input() pokemon: Pokemon|undefined;
  types: string[] = [];

  // const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  // this.form = this.fb.group({
  //   s_url: ['', [Validators.required, Validators.pattern(urlRegex)]],
  // });

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(){
    this.types = this.pokemonService.getTypesList();
  }

  hasType(type: string): boolean{
    return this.pokemon?.types.includes(type) || false
  } 

  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked

    if(isChecked) {
      this.pokemon?.types.push(type)
    } else {
      const key = this.pokemon?.types.indexOf(type);
      if(key){
        this.pokemon?.types.splice(key, 1)
      }
    }
  }

  onSubmit(){
    if (this.pokemon) {
      if (this.pokemon.id) {
        this.pokemonService.updatePokemon(this.pokemon).subscribe({
          next: (response) => {
            this.router.navigate(['/pokemon', this.pokemon?.id])
          },
          error: (err) => {
            console.log(err)
          }
        });
      } else {
        let imageId = Math.floor(Math.random() * (1000 - 100) ) + 100;
        this.pokemon.picture = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
        this.pokemonService.addPokemon(this.pokemon).subscribe({
          next: (pokemonId) => {
            this.router.navigate(['/pokemon', pokemonId])
          },
          error: (err) => {
            console.log(err)
          }
        });
      }
    }
  }

}
