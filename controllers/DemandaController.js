const db = require("../models");
const { Op } = require("sequelize");
const functionRavex = require("./functionRavex.js");
require("dotenv").config();

const conferencia = db.Conferencia;
const notaFiscal = db.NotaFiscal;
const demanda = db.DemandaRetorno;

class DemandaController {
  static cadastrarDemanda = async (req, res) => {
    const { refViagem, operadorId, placa } = req.body;

    const dados = await demanda.create({
      referencia_viagem: refViagem,
      operadorId: operadorId,
      status: "A Conferir",
      placa: placa,
    });

    try {
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static atualizarDados = async (req, res) => {
    const input = demanda.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    try {
      res.status(200).json("registro realizado");
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarDemandasEmAberto = async (req, res) => {
    const dados = await demanda.findAll({
      where: {
        status: { [Op.ne]: "Finalizado" },
      },
      attributes: { exclude: ["conferenteId"] },
    });

    try {
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarDemandaporId = async (req, res) => {
    const dados = await demanda.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ["conferenteId"] },
    });

    try {
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static buscarDemandaagrupada = async (req, res) => {
    const dados = await conferencia.findAll();

    try {
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarReferencia = async (req, res) => {
    const dados = await functionRavex.buscarReferencia(
      req.params.id,
      req.params.nf
    );

    try {
      console.log(dados);
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarItens = async (req, res) => {
    const dados = await functionRavex.buscarPorNotaFiscal(
      req.params.id,
      req.params.nf
    );

    const filtrarNF = await dados.data.data.filter(
      (filtrar) => String(filtrar.notaFiscal) === String(req.params.nf)
    )[0].itens;

    try {
      console.log(filtrarNF);
      res.status(200).json("ok");
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static cadastrarProdutos = async (req, res) => {
    const dados = await functionRavex.buscarPorNotaFiscal(
      req.params.id,
      req.params.nf
    );

    const empresa = await functionRavex.buscarReferencia(
      req.params.id,
      req.params.nf
    );

    const filtrarNF = await dados.data.data.filter(
      (filtrar) => filtrar.notaFiscal === req.params.nf
    )[0];

    if (filtrarNF.status !== "Devolução parcial") {
      filtrarNF.itens.map(async (item) => {
        await conferencia.create({
          viagemId: filtrarNF.viagemId,
          nota_fiscal: filtrarNF.notaFiscal,
          referenciaItem: item.referenciaItem,
          descricaoItem: item.descricaoItem,
          empresa: empresa,
          quantidade: item.quantidade,
          demandaId: req.params.demanda,
          tipo: "contabil",
          tipodevolucao: filtrarNF.status,
          unidadeMedida: item.unidade,
        });
      });
    } else {
      const novoDados = await functionRavex.notaParcial(
        req.params.id,
        req.params.nf
      );

      const DadosFiltrados = await novoDados[0].itens.filter(
        (filtrar) => filtrar.motivo !== null
      );
      DadosFiltrados.map(async (item) => {
        await conferencia.create({
          viagemId: filtrarNF.viagemId,
          nota_fiscal: filtrarNF.notaFiscal,
          referenciaItem: item.codigo,
          empresa: empresa,
          tipodevolucao: filtrarNF.status,
          quantidade: item.quantidadeDevolvida,
          demandaId: req.params.demanda,
          tipo: "contabil",
        });
      });
      return res.status(200).json(DadosFiltrados);
    }
    /*filtrarNF[0].itens.map((item) => {
      conferencia.create({
        viagemId: filtrarNF[0].viagemId,
        referenciaItem: item.referenciaItem,
        descricaoItem: item.descricaoItem,
        quantidade: item.quantidade,
        demandaId: req.params.demanda,
        tipo: "contabil",
        unidadeMedida: item.unidade,
      });
    });*/
    try {
      res.status(200).json(dados.data.data);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}
module.exports = DemandaController;
