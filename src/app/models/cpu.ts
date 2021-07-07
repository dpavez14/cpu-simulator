import {Proceso} from "./proceso";

export class CPU {
    ciclos: number;
    cuanto: number;
    procesoActual: Proceso | undefined;

    constructor() {
        this.ciclos = 0;
        this.cuanto = 0;
        this.procesoActual = undefined;
    }
}
