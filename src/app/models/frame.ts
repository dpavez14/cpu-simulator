import {Color} from "./color";

export class Frame {
    PID: number;
    nPagina: number;
    memoriaUtilizada: number;
    color: Color;

    constructor(PID: number, nPagina: number, memoriaUtilizada: number, color: Color) {
        this.PID = PID;
        this.nPagina = nPagina;
        this.memoriaUtilizada = memoriaUtilizada;
        this.color = color;
    }
}
