import {Pagina} from "./pagina";
import {Color} from "./color";

export class Proceso {
    PID: number;
    prioridad: number;
    paginas: Pagina[];
    ciclosRestantes: number;
    tamano: number;
    color: Color;
    isVirtual = false;

    constructor(PID: number, prioridad: number, tamano: number, ciclosRestantes: number, color: Color) {
        this.PID = PID;
        this.prioridad = prioridad;
        this.paginas = [];
        this.ciclosRestantes = ciclosRestantes;
        this.tamano = tamano;
        this.color = color;
        this.isVirtual = false;
    }
}
