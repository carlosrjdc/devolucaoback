const express = require("express");
const cors = require("cors");
const NotasFiscaisRavex = require("./NotasFiscaisRavex.js");
const Conferencia = require("./Conferencia.js");
const Demanda = require("./Demanda.js");

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ Titulo: "Carlos Roberto" });
  });

  app.use(
    express.json(),
    cors(),
    NotasFiscaisRavex,
    Conferencia,
    Demanda,

    express.raw({ type: "application/pdf" })
  );
};

module.exports = routes;
