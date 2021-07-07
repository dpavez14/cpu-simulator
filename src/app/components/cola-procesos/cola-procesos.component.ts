import { Component, OnInit } from '@angular/core';
import {Pagina} from "../../models/pagina";
import {DataService} from "../../services/data.service";
import {Proceso} from "../../models/proceso";
import {Color} from "../../models/color";

@Component({
  selector: 'app-cola-procesos',
  templateUrl: './cola-procesos.component.html',
  styleUrls: ['./cola-procesos.component.scss']
})
export class ColaProcesosComponent implements OnInit {

  procesosPrioridad4: Proceso[] = [];
  procesosPrioridad3: Proceso[] = [];
  procesosPrioridad2: Proceso[] = [];
  procesosPrioridad1: Proceso[] = [];
  procesosPrioridad0: Proceso[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.procesosPrioridad4$.subscribe(val => this.procesosPrioridad4 = val);
    this.dataService.procesosPrioridad3$.subscribe(val => this.procesosPrioridad3 = val);
    this.dataService.procesosPrioridad2$.subscribe(val => this.procesosPrioridad2 = val);
    this.dataService.procesosPrioridad1$.subscribe(val => this.procesosPrioridad1 = val);
    this.dataService.procesosPrioridad0$.subscribe(val => this.procesosPrioridad0 = val);
  }

  getFontColor(background: Color): string {
    return this.dataService.getFontColor(background);
  }

  decimalToHex(d: number) {
    return this.dataService.decimalToHex(d);
  }

}
