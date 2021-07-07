import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, timer} from "rxjs";
import {Proceso} from "../models/proceso";
import {Pagina} from "../models/pagina";
import {Color} from "../models/color";
import {Frame} from "../models/frame";
import {Memoria} from "../models/memoria";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  relojCPU: Observable<number> = timer(0);

  private memoriaPrincipalSubject$ = new BehaviorSubject<Memoria | undefined>(undefined);
  private memoriaVirtualSubject$ = new BehaviorSubject<Memoria | undefined>(undefined);

  private procesosPrioridad4Subject$ = new BehaviorSubject<Proceso[]>([]);
  private procesosPrioridad3Subject$ = new BehaviorSubject<Proceso[]>([]);
  private procesosPrioridad2Subject$ = new BehaviorSubject<Proceso[]>([]);
  private procesosPrioridad1Subject$ = new BehaviorSubject<Proceso[]>([]);
  private procesosPrioridad0Subject$ = new BehaviorSubject<Proceso[]>([]);

  private procesoActualSubject$ = new BehaviorSubject<Proceso | undefined>(undefined);
  private ciclosSubject$ = new BehaviorSubject<number>(0);
  private restanteCPUSubject$ = new BehaviorSubject<number>(0);
  private iniciadoSubject$ = new BehaviorSubject<boolean>(false);
  private pausadoSubject$ = new BehaviorSubject<boolean>(false);


  get memoriaPrincipal$(): Observable<Memoria | undefined> {
    return this.memoriaPrincipalSubject$.asObservable();
  }
  get memoriaVirtual$(): Observable<Memoria | undefined> {
    return this.memoriaVirtualSubject$.asObservable();
  }
  get procesosPrioridad4$(): Observable<Proceso[]> {
    return this.procesosPrioridad4Subject$.asObservable();
  }
  get procesosPrioridad3$(): Observable<Proceso[]> {
    return this.procesosPrioridad3Subject$.asObservable();
  }
  get procesosPrioridad2$(): Observable<Proceso[]> {
    return this.procesosPrioridad2Subject$.asObservable();
  }
  get procesosPrioridad1$(): Observable<Proceso[]> {
    return this.procesosPrioridad1Subject$.asObservable();
  }
  get procesosPrioridad0$(): Observable<Proceso[]> {
    return this.procesosPrioridad0Subject$.asObservable();
  }
  get procesoActual$(): Observable<Proceso | undefined> {
    return this.procesoActualSubject$.asObservable();
  }
  get ciclos$(): Observable<number> {
    return this.ciclosSubject$.asObservable();
  }
  get restanteCPU$(): Observable<number> {
    return this.restanteCPUSubject$.asObservable();
  }
  get iniciado$(): Observable<boolean> {
    return this.iniciadoSubject$.asObservable();
  }
  get pausado$(): Observable<boolean> {
    return this.pausadoSubject$.asObservable();
  }

  tamanoPaginas = 0;
  tamanoMemoria = 0;
  PIDActual = 1;
  cuantoCPU = 0;
  tiempoCiclo = 0;
  tiempoPausa = 0;
  fifoMemoriaPrincipal: Proceso[] = [];

  constructor() { }

  iniciar(cuanto: number, tamanoMemoria: number, tamanoPaginas: number, tiempoCiclo: number) {
    this.iniciarDatos(cuanto, tamanoMemoria, tamanoPaginas, tiempoCiclo);
    this.procesar();
  }

  iniciarDatos(cuanto: number, tamanoMemoria: number, tamanoPaginas: number, tiempoCiclo: number) {
    this.cuantoCPU = cuanto;
    this.tamanoMemoria = tamanoMemoria;
    this.tamanoPaginas = tamanoPaginas;
    this.tiempoCiclo  = tiempoCiclo;
    this.fifoMemoriaPrincipal = [];

    this.iniciadoSubject$.next(true);
    this.memoriaPrincipalSubject$.next(new Memoria(this.tamanoMemoria/this.tamanoPaginas));
    this.memoriaVirtualSubject$.next(new Memoria( 4096/this.tamanoPaginas)); //4 GB aprox
    this.restanteCPUSubject$.next(this.cuantoCPU);
    this.relojCPU = timer(1000, 1000);
  }

  pausar() {
    this.pausadoSubject$.next(true);
  }

  continuar() {
    this.pausadoSubject$.next(false);
  }

  agregarProceso(prioridad: number) {
    const p = new Proceso(this.PIDActual, prioridad, this.getRandomInt(1,this.tamanoMemoria/4), this.getRandomInt(2,10), this.getRandomColor());
    let nPag = Math.floor(p.tamano/this.tamanoPaginas);

    //Asignar espacio utilizado de páginas
    //Paginas llenas (sin fragmentacion)
    for (let i = 0; i < nPag; i++) {
      const pag = new Pagina();
      pag.espacioUtilizado = this.tamanoPaginas;
      p.paginas.push(pag);
    }
    //Pagina con espacio vacio (fragmentacion interna)
    if (p.tamano - (nPag * this.tamanoPaginas) > 0) {
      const pag = new Pagina();
      pag.espacioUtilizado = p.tamano - (nPag * this.tamanoPaginas);
      p.paginas.push(pag);
      nPag++;
    }

    //Asignar direcciones en memoria a las paginas (principal o secundaria si la principal no tiene espacio suficiente)
    let memoriaP = this.memoriaPrincipalSubject$.getValue();
    let memoriaV = this.memoriaVirtualSubject$.getValue();
    if (memoriaP != null && memoriaP.cantidadFramesLibres() >= nPag) {
      for (let i = 0; i < nPag; i++) {
        const direccion = memoriaP.asignarFrame(p.PID, i, p.tamano, p.color);
        if (direccion != null) {
          p.paginas[i].direccionFisica = direccion;
          this.fifoMemoriaPrincipal.push(p);
        }
      }
      this.memoriaPrincipalSubject$.next(memoriaP);
    }
    else if (memoriaV != null && memoriaV.cantidadFramesLibres() >= nPag) {
      p.isVirtual = true;
      for (let i = 0; i < nPag; i++) {
        const direccion = memoriaV.asignarFrame(p.PID, i, p.tamano, p.color);
        if (direccion != null) {
          p.paginas[i].direccionFisica = direccion;
        }
      }
      this.memoriaVirtualSubject$.next(memoriaV);
    }

    //Agregar a cola de procesos de acuerdo a la prioridad
    let procesos = [];
    if (prioridad == 4) {
      procesos = this.procesosPrioridad4Subject$.getValue();
      procesos.push(p);
      this.procesosPrioridad4Subject$.next(procesos);
    }
    else if (prioridad == 3) {
      procesos = this.procesosPrioridad3Subject$.getValue();
      procesos.push(p);
      this.procesosPrioridad3Subject$.next(procesos);
    }
    else if (prioridad == 2) {
      procesos = this.procesosPrioridad2Subject$.getValue();
      procesos.push(p);
      this.procesosPrioridad2Subject$.next(procesos);
    }
    else if (prioridad == 1) {
      procesos = this.procesosPrioridad1Subject$.getValue();
      procesos.push(p);
      this.procesosPrioridad1Subject$.next(procesos);
    }
    else if (prioridad == 0) {
      procesos = this.procesosPrioridad0Subject$.getValue();
      procesos.push(p);
      this.procesosPrioridad0Subject$.next(procesos);
    }

    this.PIDActual++;
  }

  procesar() {
    this.relojCPU.subscribe(tiempoTotal => {
      const pausado = this.pausadoSubject$.getValue();
      if(pausado) {
        this.tiempoPausa++;
      }
      else if (!pausado && ((tiempoTotal + 1 - this.tiempoPausa) % this.tiempoCiclo) == 0) {
        this.ciclosSubject$.next(this.ciclosSubject$.getValue() + 1);
        let proceso: Proceso | undefined = this.procesoActualSubject$.getValue();
        if (proceso != null) {
          proceso.ciclosRestantes--;
          this.restanteCPUSubject$.next(this.restanteCPUSubject$.getValue() - 1);
          if (proceso.ciclosRestantes <= 0)  {
            this.eliminarProcesoMemoria(proceso);
            const p = this.obtenerProcesoCola();
            this.asignarProcesoActual(p);
          }
          else if (this.restanteCPUSubject$.getValue() <= 0) {
            this.moverProcesoFinCola(proceso);
            proceso = this.obtenerProcesoCola();
            this.asignarProcesoActual(proceso);
            this.restanteCPUSubject$.next(this.cuantoCPU); //Reiniciar cuanto de CPU
          }
          else {
            //Actualizar tiempo restante de proceso actual
            this.procesoActualSubject$.next(proceso);
          }
        }
        else {
          proceso = this.obtenerProcesoCola();
          this.asignarProcesoActual(proceso);
        }
      }
    });
  }

  asignarProcesoActual(proceso: Proceso | undefined) {
    if (proceso != null) {
      if (proceso.isVirtual) {
        this.moverProcesoMemoriaPrincipal(proceso);
      }
    }
    this.restanteCPUSubject$.next(this.cuantoCPU);
    this.procesoActualSubject$.next(proceso);
  }

  moverProcesoMemoriaPrincipal(proceso: Proceso) {
    if (proceso.isVirtual) {
      const memoriaPrincipal = this.memoriaPrincipalSubject$.getValue();
      const memoriaVirtual = this.memoriaVirtualSubject$.getValue();
      if (memoriaPrincipal != null && memoriaVirtual != null) {
        //Mover paginas de memoria principal a la virtual hasta que haya espacio para el proceso que se quiere mover
        while (memoriaPrincipal.cantidadFramesLibres() < proceso.paginas.length) {
          const procesoRemover = this.fifoMemoriaPrincipal.shift();
          if (procesoRemover != null) {
            for (let i = 0; i < procesoRemover.paginas.length; i++) {
              const pagina = procesoRemover.paginas[i];
              memoriaPrincipal.liberarFrameUsado(pagina.direccionFisica);
              memoriaVirtual.asignarFrame(procesoRemover.PID, i, procesoRemover.tamano, procesoRemover.color);
            }
            procesoRemover.isVirtual = true;
          }
        }
        //Mover desde memoria virtual a la memoria principal
        for (let i = 0; i < proceso.paginas.length; i++) {
          memoriaVirtual.liberarFrameUsado(proceso.paginas[i].direccionFisica);
          const direccion = memoriaPrincipal.asignarFrame(proceso.PID, i, proceso.tamano, proceso.color);
          if (direccion != null) {
            proceso.paginas[i].direccionFisica = direccion;
          }
          proceso.isVirtual = false;
        }
      }
      this.memoriaPrincipalSubject$.next(memoriaPrincipal);
      this.memoriaVirtualSubject$.next(memoriaVirtual);
      this.fifoMemoriaPrincipal.push(proceso);
    }
  }

  moverProcesoFinCola(proceso: Proceso) {
    const procesoActual = this.procesoActualSubject$.getValue();
    if (procesoActual != null) {
      if (procesoActual.prioridad == 4) {
        const procesos = this.procesosPrioridad4Subject$.getValue();
        procesos.push(proceso);
        this.procesosPrioridad4Subject$.next(procesos);
      }
      else if (procesoActual.prioridad == 3) {
        const procesos = this.procesosPrioridad3Subject$.getValue();
        procesos.push(proceso);
        this.procesosPrioridad3Subject$.next(procesos);
      }
      else if (procesoActual.prioridad == 2) {
        const procesos = this.procesosPrioridad2Subject$.getValue();
        procesos.push(proceso);
        this.procesosPrioridad2Subject$.next(procesos);
      }
      else if (procesoActual.prioridad == 1) {
        const procesos = this.procesosPrioridad1Subject$.getValue();
        procesos.push(proceso);
        this.procesosPrioridad1Subject$.next(procesos);
      }
      else if (procesoActual.prioridad == 0) {
        const procesos = this.procesosPrioridad0Subject$.getValue();
        procesos.push(proceso);
        this.procesosPrioridad0Subject$.next(procesos);
      }
    }
  }

  eliminarProcesoMemoria(proceso: Proceso) {
    const memoriaPrincipal = this.memoriaPrincipalSubject$.getValue();
    for (let i = 0; i < proceso.paginas.length; i++) {
      memoriaPrincipal?.liberarFrameUsado(proceso.paginas[i].direccionFisica);
    }
  }

  obtenerProcesoCola(): Proceso | undefined {
    let procesos = this.procesosPrioridad4Subject$.getValue();
    let p: Proceso | undefined = procesos.shift();
    this.procesosPrioridad4Subject$.next(procesos);
    if (p == null) {
      procesos = this.procesosPrioridad3Subject$.getValue();
      p = procesos.shift();
      this.procesosPrioridad3Subject$.next(procesos);
      if (p == null) {
        procesos = this.procesosPrioridad2Subject$.getValue();
        p = procesos.shift();
        this.procesosPrioridad2Subject$.next(procesos);
        if (p == null) {
          procesos = this.procesosPrioridad1Subject$.getValue();
          p = procesos.shift();
          this.procesosPrioridad1Subject$.next(procesos);
          if (p == null) {
            procesos = this.procesosPrioridad0Subject$.getValue();
            p = procesos.shift();
            this.procesosPrioridad0Subject$.next(procesos);
          }
        }
      }
    }
    return p;
  }

  decimalToHex(d: number): string {
    let hex = d.toString(16);
    let padding = 8;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return "0x"+(hex).toUpperCase();
  }

  //Entero random entre nim y max (ambos incluidos)
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomColor(): Color {
    return new Color(this.getRandomInt(10,200), this.getRandomInt(10,200), this.getRandomInt(10,200));
  }

  getFontColor(background: Color): string {
    if((background.r*0.299 + background.g*0.587 + background.b*0.114) > 105){
      return "#000000";
    }
    return "#FFFFFF";
  }
}
