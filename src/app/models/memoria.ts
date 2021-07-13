import {Frame} from "./frame";
import {Color} from "./color";
import {Proceso} from "./proceso";

export class Memoria {
    cantidadFrames: number;
    private indicesFramesLibres: number[];
    framesUsados: Frame[];
    ordenReemplazo: Proceso[] = [];

    constructor(nFrames: number) {
        this.cantidadFrames = nFrames;
        this.indicesFramesLibres = [];
        this.framesUsados = [];
        for (let i = 0; i < nFrames; i++) {
            this.indicesFramesLibres.push(i);
        }
        //Dejar arreglo framesUsados con valores vacíos hasta nFrames-1
        this.framesUsados[nFrames - 1] = new Frame(0,0, 0,new Color(0,0,0));
        delete this.framesUsados[nFrames - 1];
    }

    //Retorna la direccion fisica en que se asigno
    asignarFrame(proceso: Proceso, indicePagina: number): number | undefined {
        const frame = this.indicesFramesLibres.shift();
        if(frame != null) {
            this.framesUsados[frame] = (new Frame(proceso.PID, indicePagina, proceso.paginas[indicePagina].espacioUtilizado, proceso.color));
        }
        return frame;
    }

    liberarFramesProceso(proceso: Proceso) {
        for (let i = 0; i < this.ordenReemplazo.length; i++) {
            if (this.ordenReemplazo[i].PID == proceso.PID) {
                this.ordenReemplazo.splice(i, 1);
                for (let j = 0; j < proceso.paginas.length; j++) {
                    const frame = proceso.paginas[j].direccionFisica;
                    this.liberarFrameUsado(frame);
                }
                return;
            }
        }
    }

    liberarFrameUsado(frame: number) {
        if (frame < this.cantidadFrames) {
            delete this.framesUsados[frame];
        }
        if (this.framesUsados[frame] == null) {
            this.indicesFramesLibres.push(frame);
        }
    }

    cantidadFramesLibres(): number {
        return this.indicesFramesLibres.length;
    }
}
