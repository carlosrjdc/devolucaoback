"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NotaFiscal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NotaFiscal.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      demandagerada: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.STRING,
      },
      empresa: {
        type: DataTypes.STRING,
      },
      nota_fiscal: {
        unique: true,
        type: DataTypes.STRING,
      },
      placa: {
        type: DataTypes.STRING,
      },
      transportadora: {
        type: DataTypes.STRING,
      },
      id_viagem: {
        type: DataTypes.STRING,
      },
      transporte: {
        type: DataTypes.STRING,
      },
      hora_registro: {
        type: DataTypes.STRING,
      },
      status_nf: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "NotaFiscal",
    }
  );
  return NotaFiscal;
};
