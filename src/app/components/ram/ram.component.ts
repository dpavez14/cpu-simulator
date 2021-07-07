import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Pagina} from "../../models/pagina";
import {Memoria} from "../../models/memoria";
import {Color} from "../../models/color";

@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrls: ['./ram.component.scss']
})
export class RamComponent implements OnInit {

  memoria: Memoria | undefined = undefined;

  public paginas: Pagina[] = [
  ];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.memoriaPrincipal$.subscribe(val => this.memoria = val);
  }

  getFontColor(background: Color): string {
    return this.dataService.getFontColor(background);
  }
}
