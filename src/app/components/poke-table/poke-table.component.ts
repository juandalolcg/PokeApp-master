import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Button } from 'protractor';
import { query } from '@angular/animations';


@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  // displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  // dataSource = new MatTableDataSource<any>(this.data);
  start = 151;
  end = 300;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pokemons = [];

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {

    this.getPokemons(1, 300);
    window.addEventListener('scroll', this.scrollEvent, true);
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {

    let bottomreached = false;
    const n = event.srcElement.scrollingElement.scrollTop;
    console.log(n);
    if(this.end < 893){
      if(event.srcElement.scrollingElement.scrollTop > document.getElementById("body-pkm").scrollHeight-500){

        bottomreached = true;
        this.getPokemons(this.start,this.end);
        this.start = this.start +150;
        this.end = this.end +150;
      }else{
        bottomreached = false;
      }
    }

  }



  getPokemons(start, end) {
    let pokemonData;



    for (let i = start; i <= end; i++) {

      this.pokemonService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          };



          this.data.push(pokemonData);
          console.log(pokemonData);


          /*INCRUSTAR HTML*/


          const app = document.getElementById("last");


          const button = document.createElement("button");
          const div = document.createElement("div");
          const h2 = document.createElement("h2");
          div.className = 'Main-Card col-md-3 card';
          const h3 = document.createElement("h3");
          h3.className = 'Card-Title';
          const img = document.createElement("img");
          h2.textContent = pokemonData.position;
          h3.textContent = pokemonData.name;
          h3.style.textTransform = 'capitalize';
          img.src = pokemonData.image;
          img.className = 'card-img-top';
          button.textContent = "More Info";
          button.value = pokemonData.position;
          button.className = 'btn btn-primary mb-3';
          div.style.borderRadius = '20px';
          button.addEventListener('click', (e) => {
            this.triggerAlert(button.value);//your typescript function
          });

          div?.appendChild(h2);
          div?.appendChild(img);
          div?.appendChild(h3);
          div?.appendChild(button);
          app?.appendChild(div);


          // this.dataSource = new MatTableDataSource<any>(this.data);
          // this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      );
    }


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }


  getRow(row) {
    //console.log(row);
    this.router.navigateByUrl(`/pokeDetail/${row.position}`)
  }

  triggerAlert(pokeid) {
    this.router.navigateByUrl(`/pokeDetail/${pokeid}`)
  }
  triggerSearch() {
    let busqueda = (document.getElementById("searchInput") as HTMLInputElement).value;
    this.router.navigateByUrl(`/pokeDetail/${busqueda}`)
  }

}
