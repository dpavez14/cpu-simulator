import { Component, OnInit } from '@angular/core';
import {Pagina} from "../../models/pagina";

@Component({
  selector: 'app-memoria-logica',
  templateUrl: './memoria-logica.component.html',
  styleUrls: ['./memoria-logica.component.scss']
})
export class MemoriaLogicaComponent implements OnInit {

  public paginas: Pagina[] = [
    {direccion: 1},
    {direccion: 2},
    {direccion: 3},
    {direccion: 4},
    {direccion: 5}
  ];

  constructor() {
  }

  ngOnInit(): void {

  }

}
