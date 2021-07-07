import {Frame} from "./frame";
import {Color} from "./color";

export class Memoria {
    private indicesFramesLibres: number[];
    framesUsados: Frame[];

    constructor(nFrames: number) {
        this.indicesFramesLibres = [];
        this.framesUsados = [];
        for (let i = 0; i < nFrames; i++) {
            this.indicesFramesLibres.push(i);
        }
        this.framesUsados[nFrames - 1] = new Frame(0,0, 0,new Color(0,0,0));
        delete this.framesUsados[nFrames - 1];
    }

    //Retorna la direccion fisica en que se asigno
    asignarFrame(PID: number, nPagina: number, memoriaUtilizada:number, color: Color): number | undefined {
        const frame = this.indicesFramesLibres.shift();
        if(frame != null) {
            this.framesUsados[frame] = (new Frame(PID, nPagina, memoriaUtilizada, color));
        }
        return frame;
    }

    liberarFrameUsado(frame: number) {
        delete this.framesUsados[frame];
        this.indicesFramesLibres.push(frame);
    }

    cantidadFramesLibres(): number {
        return this.indicesFramesLibres.length;
    }
}
