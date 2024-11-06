export const identificationOptionsFormulario = [
  { id: "TI", nombre: "Tarjeta de Identidad" },
  { id: "CC", nombre: "Cédula de Ciudadanía" },
  { id: "CE", nombre: "Cédula de Extranjería" },
  { id: "PA", nombre: "Pasaporte" },
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

export const CODE_TO_ID_TITULO: { [key: number]: number } = {
  52928: 1,
  102519: 1,
  53445: 2,
  102322: 2,
  52536: 3,
  52639: 4,
  15864: 5,
  14351: 5,
  15865: 5,
  15861: 6,
  15862: 6,
  5363: 6,
  2742: 6,
  14355: 6,
  3092: 7,
  101274: 7,
  2458: 8,
  2700: 9,
  15616: 9,
  3485: 10,
  14365: 10,
  101511: 11,
  19432: 12,
};

export const CODE_TECNICO_TO_ID_TITULO: { [key: number]: number } = {
  11: 13,
  5: 14,
  15: 15,
  7: 16,
  14: 17,
  12: 18,
  13: 19,
  6: 20,
  4: 21,
  8: 22,
  1: 23,
  2: 24,
  9: 25,
  10: 26,
  3: 27,
  39253: 28,
  4548: 29,
};
