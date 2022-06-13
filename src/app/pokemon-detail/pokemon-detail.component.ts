import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: [ './pokemon-detail.component.less' ]
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.pokemonService.getPokemon(id)
      .subscribe(pokemon => {
        this.pokemon = pokemon;
        console.log(this.pokemon)
        console.log(this.pokemon.sprites.front_default)
      });
  }

  goBack(): void {
    this.location.back();
  }

}
