const Axios = require("../config/Ravex.js");

const Ravex = {
  periodoLongo: async (data) => {
    const teste = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40,
    ];
    const dadosresultado = [];

    const testemap = teste.map(async (item) => {
      const dadosmap = await Axios.get(
        `api/nota-fiscal/obter-notas-fiscais-por-periodo?skip=${item}&take=1000&dataHoraInicio=2023-04-01T00:00:01&dataHoraFim=${data}T23:59:59`
      );

      return dadosmap.data.data;
    });

    const dados = await Promise.all(testemap);

    const agrupardados = await dados.reduce((acc, item) => {
      return acc.concat(
        Array.from(item).filter(
          (filtrar) =>
            filtrar.unidade === "Itambé R. de Janeiro" &&
            filtrar.status !== "A entregar" &&
            filtrar.status !== "Entregue" &&
            filtrar.status !== "Entregando" &&
            filtrar.status !== "Reentrega em outra viagem" &&
            filtrar.status !== "Pernoite" &&
            filtrar.status !== "Migrada para outra viagem" &&
            filtrar.status !== "Anomalia"
        )
      );
    }, []);

    return agrupardados;
  },
  buscarPorNotaFiscal: async (id, nf) => {
    const dados = Axios.get(
      `/api/viagem-faturada/${id}/obter-notas-fiscais-por-viagem`
    );
    return dados;
  },

  buscarReferencia: async (id, nf) => {
    const dados = await Axios.get(`/api/viagem-faturada/${id}/notas-fiscais`);
    const filtrado = await dados.data.data.filter(
      (filtrar) => parseInt(filtrar.numero) == nf
    );
    return filtrado[0]?.remetente?.nome;
  },
  notaParcial: async (id, nf) => {
    const dados = await Axios.get(
      `/api/viagem-faturada/${id}/anomalias-registradas`
    );
    const DadosFiltado = await dados.data.data.filter(
      (nota) => nota.numeroNotaFiscal === nf
    );

    return DadosFiltado;
  },
};

module.exports = Ravex;
