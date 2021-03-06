import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pokemon } from './models/pokemon';
import { PokemonAPIReponse } from './models/pokemonapiresponse';

@Injectable({ providedIn: 'root' })
export class PokemonService {

  private pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
    ) { }

  /** GET pokemons from the server */
  getPokemons(): Observable<PokemonAPIReponse> {
    return this.http.get<PokemonAPIReponse>(this.pokemonsUrl+"?limit=100")
      .pipe(
        tap(_ => this.log('fetched pokemons')),
        catchError(this.handleError<PokemonAPIReponse>('getPokemons'))
      );
  }

  /** GET pokemon by id. Return `undefined` when id not found */
  getPokemonNo404<Data>(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/?id=${id}`;
    return this.http.get<Pokemon[]>(url)
      .pipe(
        map(pokemons => pokemons[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} pokemon id=${id}`);
        }),
        catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
      );
  }

  /** GET pokemon by id. Will 404 if id not found */
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  /* GET pokemons whose name contains search term */
  searchPokemons(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      // if not search term, return empty pokemon array.
      return of([]);
    }
    return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found pokemons matching "${term}"`) :
         this.log(`no pokemons matching "${term}"`)),
      catchError(this.handleError<Pokemon[]>('searchPokemons', []))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PokemonService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`PokemonService: ${message}`);
  }
}
