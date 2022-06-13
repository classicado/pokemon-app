import { Ability } from "./abilities";
import { Move } from "./move";
import { Species } from "./species";
import { Sprites } from "./sprites";
import { Stat } from "./stat";

  export interface Pokemon {

    id: number;
    name: string;
    url: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    default_image_url: string;

    species: Species;
    abilities: Ability[];
    moves: Move[];
    stats: Stat[];
    sprites: Sprites;
  }

