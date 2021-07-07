import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Pagina} from "../../models/pagina";

@Component({
  selector: 'app-tabla-traduccion',
  templateUrl: './tabla-traduccion.component.html',
  styleUrls: ['./tabla-traduccion.component.scss']
})
export class TablaTraduccionComponent implements OnInit {

  public paginas: Pagina[] = [
  ];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }


  decimalToHex(d: number) {
    return this.dataService.decimalToHex(d);
  }

}
