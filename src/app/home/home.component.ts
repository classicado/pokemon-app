import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { PokemonAPIReponse } from '../pokemonapiresponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  pokemons: Pokemon[] = [];
  previousPageLink? :string;
  nextPageLink? :string;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(res =>{
        this.pokemons =  res.results;
        this.previousPageLink =  res.previous;
        this.nextPageLink =  res.next;

        //Extract and set ID property
        this.pokemons.forEach( (p) => {
            let tempStr = p.url.replace("https://pokeapi.co/api/v2/pokemon/","");
            tempStr = tempStr.replace("/","");
            p.id = Number(tempStr);

            p.default_image_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/"+ Number(tempStr) +".png";
        });

       });

  }
}
