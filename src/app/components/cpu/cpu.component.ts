import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.scss']
})
export class CpuComponent implements OnInit {

  public PID: string;
  public tamano: number;

  constructor() {
    this.PID = "hola";
    this.tamano = 0;
  }

  ngOnInit(): void {
  }

}
