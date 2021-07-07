import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  cuanto = 1;
  tiempoCiclo = 1;
  tamanoMemoria = 8;
  tamanoPaginas = 1;
  prioridad = "0";
  iniciado = false;
  pausado = false;
  nProcesos = 1;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.iniciado$.subscribe(val => this.iniciado = val);
    this.dataService.pausado$.subscribe(val => this.pausado = val);
  }

  agregarProceso() {
    if (!this.iniciado) {
      this.dataService.iniciar(this.cuanto, this.tamanoMemoria,+this.tamanoPaginas, this.tiempoCiclo);
    }
    for (let i = 0; i < this.nProcesos; i++) {
      this.dataService.agregarProceso(+this.prioridad);
    }
  }

  pausar() {
    if(this.iniciado) {
      this.dataService.pausar();
    }
  }

  continuar() {
    if(this.iniciado) {
      this.dataService.continuar();
    }
  }
}
