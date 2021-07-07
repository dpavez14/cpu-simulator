import { Component, OnInit } from '@angular/core';
import {Pagina} from "../../models/pagina";
import {DataService} from "../../services/data.service";
import {Color} from "../../models/color";
import {Proceso} from "../../models/proceso";

@Component({
  selector: 'app-memoria-logica',
  templateUrl: './memoria-logica.component.html',
  styleUrls: ['./memoria-logica.component.scss']
})
export class MemoriaLogicaComponent implements OnInit {

  procesoActual: Proceso | undefined = undefined;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.procesoActual$.subscribe(val => this.procesoActual = val);
  }

  getFontColor(background: Color): string {
    return this.dataService.getFontColor(background);
  }
}
