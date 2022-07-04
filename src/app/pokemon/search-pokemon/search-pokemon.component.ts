import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
 
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>()
  pokemons$: Observable<Pokemon[]>

  constructor(
    private router: Router,
    private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemons$ = this.searchTerms.pipe(
      //evite les requettes serveur à chaque frappe de l'utilisateur et attend 300ms
      debounceTime(300),
      //attend les changements de l'utilisateur
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    )
  }

  search(term: string) {
    //met à jour la recherche à chaque lettre
    this.searchTerms.next(term)
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.name]
    this.router.navigate(link)
  }
}
