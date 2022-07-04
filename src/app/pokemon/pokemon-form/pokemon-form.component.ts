import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon
  types: string[]
  isAddForm: boolean

  constructor(
    private pokemonService: PokemonService,
    private router: Router
    ) { }

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList()
    this.isAddForm = this.router.url.includes('add')
  }

    // vérification du type du pokemon en cour d'édition
    hasType(type: string): boolean {
      return this.pokemon.types.includes(type)
    }

    // modification du type du pokemon (ajout/suppressin)
    selectType($event: Event, type: string) {
      const isChecked: boolean = ($event.target as HTMLInputElement).checked
      
      if(isChecked) {
        this.pokemon.types.push(type)
      } else {
        const index = this.pokemon.types.indexOf(type)
        this.pokemon.types.splice(index, 1)
      }
    }

    isTypesValid(type: string): boolean {
      // si le pokemon n'a qu'un type et que je travail sur le type courant, la checkbox est bloqué (de cette façon le pokemon ne peut pas de pas avoir de type)
      if(this.pokemon.types.length == 1 && this.hasType(type)) {
        return false
      }

      // si le pokemon à 3 type les autres chekbox sont bloqué
      if(this.pokemon.types.length > 2 && !this.hasType(type)) {
        return false
      }

      return true
    }

    //soumission du formulaire
    onSubmit() {
      if(this.isAddForm) {
        this.pokemonService.addPokemon(this.pokemon)
         .subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemon', pokemon.name]))
      } else {
        this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(['/pokemon', this.pokemon.name]))
      }
    }
}
