import { Pokemon } from "./pokemon";

export interface PokemonAPIReponse {
  count: number;
  next?: string;
  previous?: any;
  results: Pokemon[];
}

