import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class DetailPokemonComponent implements OnInit {

  pokemon: Pokemon|undefined

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService) { }

  ngOnInit(){
    const pokemonName: string|null = this.route.snapshot.paramMap.get('name')

    if(pokemonName) {
      this.pokemonService.getPokemonByName(pokemonName)
        .subscribe(pokemon => this.pokemon = pokemon)
    }
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id)
      .subscribe(() => this.goToPokemonList())
  }

  goToPokemonList(){
    this.router.navigate(['/pokemons'])
  }

  goToPokemonEdit(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.name])
  }
}
