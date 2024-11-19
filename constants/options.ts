export const identificationOptionsFormulario = [
  { id: "TI", nombre: "Tarjeta de Identidad" },
  { id: "CC", nombre: "Cédula de Ciudadanía" },
  { id: "CE", nombre: "Cédula de Extranjería" },
  { id: "PA", nombre: "Pasaporte" },
  { id: "PPT", nombre: "Permiso de Protección Temporal" },
];

export const identificationSolicitanteOptionsFormulario = [
  "Cédula de Ciudadanía",
  "Cédula de Extranjería",
  "Pasaporte",
];

export const formaciones = [
  { id: "1", nombre: "Profesional" },
  { id: "2", nombre: "Técnico Laboral" },
  { id: "3", nombre: "Curso de Extension" },
];

export const extension = [
  { id: "1", nombre: "Pasto" },
  { id: "2", nombre: "Ipiales" },
  { id: "3", nombre: "Puerto Asís" },
  { id: "4", nombre: "Cali" },
  { id: "5", nombre: "Villavicencio" },
  { id: "6", nombre: "Cartagena" },
];

//constantes de los profesionales
export const EXTENSION_TO_ID: { [key: string]: number } = {
  pasto: 1,
  ipiales: 2,
  "puerto asis": 3,
  cali: 4,
  villavicencio: 5,
  cartagena: 6,
};

// Mapear las variantes comunes a sus formas estandarizadas
export const tipoMap: { [key: string]: string } = {
  "C.C": "CC",
  "C.C.": "CC",
  CC: "CC",
  "T.I": "TI",
  "T.I.": "TI",
  TI: "TI",
  "C.E": "CE",
  "C.E.": "CE",
  CE: "CE",
  "P.P.T": "PPT",
  "P.P.T.": "PPT",
  PPT: "PPT",
  PASAPORTE: "PA",
  PA: "PA",
};
