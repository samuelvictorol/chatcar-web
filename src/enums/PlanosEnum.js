const PlanosEnum = {
  MENSAL: "Plano Mensal",
  SEMESTRAL: "Plano Semestral",
  ANUAL: "Plano Anual",

  CALCULA_PLANO_MENSAL: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 dias
  CALCULA_PLANO_SEMESTRAL: new Date(Date.now() + 182 * 24 * 60 * 60 * 1000), // +182 dias (~6 meses)
  CALCULA_PLANO_ANUAL: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // +365 dias
};

module.exports = PlanosEnum;
