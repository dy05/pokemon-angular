import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTypeColor'
})
export class PokemonTypeColorPipe implements PipeTransform {

  transform(type: string): string {
    /* On recupère la variable type qui a pour valeur l'élement à gauche dans le html */
    let color: string;
    
    /* On switch sur la valeur. En fonction du type on definit une classe */
    switch (type) {
      case 'Feu':
        color = 'text-bg-danger';
        break;
      case 'Eau':
        color = 'text-bg-info';
        break;
      case 'Plante':
        color = 'text-bg-success';
        break;
      case 'Insecte':
        color = 'text-bg-insecte';
        break;
      case 'Normal':
        color = 'text-bg-secondary';
        break;
      case 'Vol':
        color = 'text-bg-vol';
        break;
      case 'Poison':
        color = 'text-bg-poison';
        break;
      case 'Fée':
        color = 'text-bg-fee';
        break;
      case 'Psy':
        color = 'text-bg-psy';
        break;
      case 'Electrik':
        color = 'text-bg-warning';
        break;
      case 'Combat':
        color = 'text-bg-combat';
        break;
      default:
        color = 'text-bg-light';
        break;
    }
    
    /* La pipe renvoi uen classe css  */ 
    return 'badge rounded-pill ' + color;
  }

}
