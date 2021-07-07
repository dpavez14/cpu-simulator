import { Component, OnInit } from '@angular/core';
import {Pagina} from "../../models/pagina";
import {DataService} from "../../services/data.service";
import {Memoria} from "../../models/memoria";
import {Color} from "../../models/color";

@Component({
  selector: 'app-disco',
  templateUrl: './disco.component.html',
  styleUrls: ['./disco.component.scss']
})
export class DiscoComponent implements OnInit {

  memoria: Memoria | undefined = undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.memoriaVirtual$.subscribe(val => this.memoria = val);
  }

  getFontColor(background: Color): string {
    return this.dataService.getFontColor(background);
  }
}
