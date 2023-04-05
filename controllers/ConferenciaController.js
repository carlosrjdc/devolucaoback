const db = require("../models");
const functionRavex = require("./functionRavex.js");
require("dotenv").config();

const conferencia = db.Conferencia;
const notaFiscal = db.NotaFiscal;

class Geral_Ravex_controller {
  //BUSCAR DADOS
  static relacionarNotas = async (req, res) => {
    const dados = await notaFiscal.findAll({
      where: { id_viagem: req.params.id },
      attributes: {
        exclude: ["notaFiscalid", "conferenteId"],
      },
    });
    try {
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static cadastrarNotas = async (req, res) => {
    const dados = await notaFiscal.findAll({
      where: { id_viagem: req.params.id },
      attributes: {
        exclude: ["notaFiscalid", "conferenteId"],
      },
    });

    try {
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static buscarProdutos = async (req, res) => {
    const dados = await functionRavex.buscarPorNotaFiscal(
      req.params.id,
      req.params.nf
    );
    const filtrarNF = await dados.data.data.filter(
      (filtrar) => filtrar.notaFiscal === req.params.nf
    );

    filtrarNF[0].itens.map((item) => {
      conferencia.create({
        viagemId: filtrarNF[0].viagemId,
        referenciaItem: item.referenciaItem,
        descricaoItem: item.descricaoItem,
        quantidade: item.quantidade,
        tipo: "contabil",
        unidadeMedida: item.unidade,
      });
    });
    try {
      res.status(200).json(filtrarNF[0]);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}
module.exports = Geral_Ravex_controller;
