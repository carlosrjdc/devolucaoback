const db = require("../models");
const functionRavex = require("./functionRavex.js");
const { Op } = require("sequelize");
require("dotenv").config();

const NotasFiscais = db.NotaFiscal;
const conferencia = db.Conferencia;

class Geral_Ravex_controller {
  //CREATE
  static inputDadosGeral = async (req, res) => {
    const dados = await functionRavex.periodoLongo(req.params.data);
    const input = await dados.map(async (item) => {
      const verificar = await NotasFiscais.count({
        where: {
          nota_fiscal: item.notaFiscal,
        },
      });
      if (verificar < 1) {
        NotasFiscais.create({
          data: item.dataHoraPrevisaoFimViagem,
          nota_fiscal: item.notaFiscal,
          placa: item.placa,
          transportadora: item.transportadora,
          transporte: item.identificador,
          id_viagem: item.viagemId,
          status_nf: item.status,
        });
      }
    });

    try {
      console.log(dados);
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static atualizarDados = async (req, res) => {
    const input = NotasFiscais.update(req.body, {
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

  static buscarDados = async (req, res) => {
    const dados = await NotasFiscais.findAll({
      where: {
        demandagerada: {
          [Op.is]: null,
        },
      },
      attributes: { exclude: ["notaFiscalid", "conferenteId"] },
      group: "id_viagem",
      order: ["id_viagem"],
    });

    try {
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarNotas = async (req, res) => {
    const dados = await NotasFiscais.findAll({
      where: {
        id_viagem: req.params.id,
        demandagerada: {
          [Op.is]: null,
        },
      },
      attributes: { exclude: ["notaFiscalid", "conferenteId"] },
      order: ["nota_fiscal"],
    });

    try {
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static notasParciais = async (req, res) => {
    const dados = await functionRavex.notaParcial(req.params.id, req.params.nf);

    try {
      console.log(dados);
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static deletarRegistro = async (req, res) => {
    const dados = await NotasFiscais.destroy({
      where: {
        id: req.params.id,
      },
    });

    try {
      console.log("Registro Deletado com sucesso");
      res.status(200).json(dados);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = Geral_Ravex_controller;
