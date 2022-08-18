//////////////////////////
/**Excepciones de acceso**/
//////////////////////////

/**-------- */
// 1.  Excepciones de API
// 		-> token invalido
const respuesta = {
  error: [
    {
      value: 'GHYUOIKSJNSN',
      msg: 'Token invalido',
      param: 'api_key',
      location: 'body',
    },
  ],
};

/**-------- */
// 2.  Excepciones de correo
//     -> Dominio de tipo: uts.edu.co (estudiante matriculado)
const respuesta2 = {
  result: 1,
  data: {
    C_ESTP_ID: 129693,
    C_PEGE_DOCUMENTOIDENTIDAD: '1098813165',
    C_PENG_PRIMERAPELLIDO: 'PICON',
    C_PENG_SEGUNDOAPELLIDO: 'JAIMES',
    C_PENG_PRIMERNOMBRE: 'NICOLAS',
    C_PENG_SEGUNDONOMBRE: null,
    C_UNID_NOMBRE: 'SEDE PRINCIPAL',
    C_PROG_NOMBRE: 'TECNOLOGIA EN DESARROLLO DE SISTEMAS INFORMATICOS',
    C_FRAN_DESCRIPCION: 'DIURNA',
    C_PENS_DESCRIPCION: 'PENSUM TSI2019-2',
    C_PENS_TOTALCREDITOS: 108,
    C_ESTP_CREDITOSAPROBADOS: 92,
    C_AVANCE: 85.2,
    C_CATE_DESCRIPCION: 'ANTIGUO',
    C_SITE_DESCRIPCION: 'SOBRESALIENTE',
    C_PENG_EMAILINSTITUCIONAL: 'npiconj@uts.edu.co',
    C_ESTP_PROMEDIOGENERAL: 4.33,
    C_PEUN_FECHAFIN: '2022-12-30T05:00:00.000Z',
  },
  error: '',
};

//    -> Dominio de tipo: correo.uts.edu.co(profesor)
const respuesta3 = {
  result: 0,
  data: {},
  error: 'El usuario ingresado no es un estudiante',
};

//    -> Dominio de tipo uts.edu.co(estudiante no matriculado)
const respuesta4 = {
  result: 3,
  data: {},
  error: 'El usuario no se encuentra con una matricula activa',
};

//     -> Dominio de otro tipo diferente a: correo.uts.edu.co(otro/extraño)
const respuesta5 = {
  result: 2,
  data: {},
  error: "'|'[-||(_+[] #/-//|3/2[-, desencriptelo mi papa!",
};

///////////////////////////
/**Excepciones de vistas**/
///////////////////////////


/**-------- */
// 1.  Excepciones de Noticias
// 		-> timeout: 5000 ms
//    -> Queda cargando el skeleton



/**-------- */
// 2.  Excepciones de Perfil
//    -> Queda cargando el spinner si timeout es alto
//    -> Ocultar para result: 0, 2, 3



/**-------- */
// 3.  Excepciones de Calificaciones
//    -> Queda cargando el spinner si timeout es alto
//    -> Ocultar para result: 0, 2, 3
//    -> Si vacio: -> Generar frontend un mensaje de error

//    -> Si no vacio:
const respuesta7 = {
  result: 1,
  data: [
    {
      materia: 'INGLES II',
      infoMateria: [
        {
          corte: 'PRIMER CORTE',
          infoCorte: [
            {
              materia: 'INGLES II',
              N_NOTA_DESCRIPCION: 'AUTOEVALUACIÓN',
              N_NOTA_PESO: 15,
              N_CALF_VALOR: 0,
            },
            {
              materia: 'INGLES II',
              N_NOTA_DESCRIPCION: 'TAREAS TIEMPO INDEPENDIENTE',
              N_NOTA_PESO: 25,
              N_CALF_VALOR: 1.5,
            },
            {
              materia: 'INGLES II',
              N_NOTA_DESCRIPCION: 'EVALULACIÓN DEL CORTE',
              N_NOTA_PESO: 60,
              N_CALF_VALOR: 4,
            },
            {
              N_NOTA_DESCRIPCION: 'DEFINITIVA CORTE',
              N_CALF_VALOR: 2.8,
            },
          ],
        },
        {
          corte: 'SEGUNDO CORTE',
        },
        {
          corte: 'TERCER CORTE',
        },
        {
          corte: 'NOTA FINAL',
        },
      ],
    },
    {},
  ],
  error: '',
};

/**-------- */
// 4.  Carnet
//    -> Queda cargando el spinner si timeout es alto
//    -> Ocultar para result: 0, 2, 3
//    -> Si vacio: -> Generar frontend un mensaje de error

/**-------- */
// 5.  Horario
//    -> Queda cargando el spinner si timeout es alto
//    -> Ocultar para result: 0, 2, 3
//    -> Si vacio: -> Generar frontend un mensaje de error

/**-------- */
// 6.  Tutorias
//    -> Queda cargando el spinner si timeout es alto
//    -> Ocultar para result: 0, 2, 3
//    -> TODO: "Terminar otras excepciones"

/**-------- */
// 7.  Revista
//    -> Queda cargando el spinner si timeout es alto


const resp = [
  {
    "N_ESTP_ID": 124623,
    "N_PEGE_DOCUMENTOIDENTIDAD": "1005108571",
    "N_PENG_PRIMERAPELLIDO": "GÓMEZ",
    "N_PENG_SEGUNDOAPELLIDO": "DELGADO",
    "N_PENG_PRIMERNOMBRE": "JOSE",
    "N_PENG_SEGUNDONOMBRE": "DAVID",
    "N_PROG_NOMBRE": "TECNOLOGIA EN DESARROLLO DE SISTEMAS INFORMATICOS",
    "N_UNID_NOMBRE": "SEDE PRINCIPAL",
    "N_MATE_CODIGOMATERIA": "DDI010",
    "N_MATE_NOMBRE": "INGLES II",
    "N_GRUP_NOMBRE": "B191",
    "N_EVAC_DESCRIPCION": "PRIMER CORTE",
    "N_NOTA_DESCRIPCION": "AUTOEVALUACIÓN",
    "N_NOTA_PESO": 15,
    "N_CALF_VALOR": 0,
    "N_DOCENTE": "VALDIVIESO MOTTA ERIK ALFREDO",
    "N_EVAC_ID": 64
  },
  {},
  {}
]