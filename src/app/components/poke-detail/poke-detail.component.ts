import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonImg = '';
  pokemonType = [];
  pokemonStats = [];
  Hp = '';
  Attack = '';
  Defense = '';
  Special_Attack = '';
  Special_defense = '';
  Speed = '';

  constructor(private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService) {

    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);
      }
    )
  }

  ngOnInit(): void {
  }

  getPokemon(id) {
    this.pokemonService.getPokemons(id).subscribe(
      res => {
        console.log(res);
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = res.types[0].type.name;
        this.Hp = res.stats[0].base_stat;
        this.Attack = res.stats[1].base_stat;
        this.Defense = res.stats[2].base_stat;
        this.Special_Attack = res.stats[3].base_stat;
        this.Special_defense = res.stats[4].base_stat;
        this.Speed = res.stats[5].base_stat;
      },
      err => {
        console.log(err);
        console.log("SE ROMPIO ESTA CHINGADERA");
        this.pokemon = "No existe";
        this.pokemonImg = "https://cdn.dribbble.com/users/159078/screenshots/2839066/page404.png";
        //this.pokemonType = "Null";
        this.Hp = "No existe";
        this.Attack = "No existe";
        this.Defense = "No existe";
        this.Special_Attack = "No existe";
        this.Special_defense = "No existe";
        this.Speed = "No existe";
      }
    )
  }


}
