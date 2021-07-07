import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Proceso} from "../../models/proceso";
import {Color} from "../../models/color";

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.scss']
})
export class CpuComponent implements OnInit {

  procesoActual: Proceso | undefined = undefined;
  ciclos = 0;
  cuantoRestante = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.procesoActual$.subscribe(val => this.procesoActual = val);
    this.dataService.ciclos$.subscribe(val => this.ciclos = val);
    this.dataService.restanteCPU$.subscribe(val => this.cuantoRestante = val);
  }

  getFontColor(background: Color): string {
    return this.dataService.getFontColor(background);
  }

}
