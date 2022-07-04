// logique d'acces au données
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';


@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) {}
  
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    )
  }


  getPokemonByName(pokemonName: string): Observable<Pokemon|undefined> {
    return this.http.get<[Pokemon]>(`api/pokemons?name=${pokemonName}`).pipe(
      map((responseTable) => responseTable[0]),
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    )
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    // si la longueur de la recherche est inferieur à 2 caractères, je n'affiche pas ma recherche
    if(term.length <=1) {
      return of([])
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    )
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    )
  }

  private log(response: any)  {
    console.table(response)
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error)
    return of(errorValue)
  }

  getPokemonTypeList(): string[] {
    return [
    'Plante',
    'Feu',
    'Eau',
    'Poison',
    'Vol',
    'Electrik',
    'Normal',
    'Insecte',
    'Fée']
  }
}
