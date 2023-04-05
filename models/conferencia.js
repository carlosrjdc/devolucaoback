"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conferencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Conferencia.belongsTo(models.Material, {
        as: "material",
        foreignKey: "materialId",
      });

      Conferencia.belongsTo(models.DemandaRetorno, {
        as: "demanda",
        foreignKey: "demandaId",
      });

      Conferencia.belongsTo(models.User, {
        as: "conferente",
        foreignKey: "conferenteId",
      });
    }
  }
  Conferencia.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      conferenteId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      demandaId: {
        type: DataTypes.INTEGER,
        references: { model: "DemandaRetornos", key: "id" },
      },
      materialId: {
        type: DataTypes.INTEGER,
        references: { model: "Materials", key: "id" },
      },
      empresa: {
        type: DataTypes.STRING,
      },
      referenciaItem: {
        type: DataTypes.STRING,
      },
      descricaoItem: {
        type: DataTypes.STRING,
      },
      viagemId: {
        type: DataTypes.STRING,
      },
      nota_fiscal: {
        type: DataTypes.STRING,
      },
      tipo: {
        type: DataTypes.STRING,
      },
      tipodevolucao: {
        type: DataTypes.STRING,
      },
      lote: {
        type: DataTypes.STRING,
      },
      quantidade: {
        type: DataTypes.INTEGER,
      },
      unidadeMedida: {
        type: DataTypes.INTEGER,
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
      modelName: "Conferencia",
    }
  );
  return Conferencia;
};
