export interface NotasInterface {
    result: number;
    data:   Materias[];
}

export interface Materias {
    materia:     string;
    infoMateria: InfoMateria[];
}

export interface InfoMateria {
    corte:         Corte;
    infoCorte?:    InfoCorte[];
    N_CALF_VALOR?: number;
}

export interface InfoCorte {
    N_ESTP_ID?:                 number;
    N_PEGE_DOCUMENTOIDENTIDAD?: string;
    N_PENG_PRIMERAPELLIDO?:     string;
    N_PENG_SEGUNDOAPELLIDO?:    string;
    N_PENG_PRIMERNOMBRE?:       string;
    N_PENG_SEGUNDONOMBRE?:      string;
    N_PROG_NOMBRE?:             string;
    N_UNID_NOMBRE?:             string;
    N_MATE_CODIGOMATERIA?:      string;
    N_MATE_NOMBRE?:             string;
    N_GRUP_NOMBRE?:             string;
    N_EVAC_DESCRIPCION?:        Corte;
    N_NOTA_DESCRIPCION:         NotaDescripcion;
    N_NOTA_PESO?:               number;
    N_CALF_VALOR:               number;
    N_DOCENTE?:                 string;
    N_EVAC_ID?:                 number;
}

export enum NotaDescripcion {
    Autoevaluacion = "AUTOEVALUACIÓN",
    DefinitivaCorte = "DEFINITIVA CORTE",
    EvalulacionDelCorte = "EVALULACIÓN DEL CORTE",
    TareasTiempoIndependiente = "TAREAS TIEMPO INDEPENDIENTE",
}

export enum Corte {
    NotaFinal = "NOTA FINAL",
    PrimerCorte = "PRIMER CORTE",
    SegundoCorte = "SEGUNDO CORTE",
    TercerCorte = "TERCER CORTE",
}