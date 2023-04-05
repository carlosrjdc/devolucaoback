"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Material.hasMany(models.Conferencia, {
        as: "material",
        foreignKey: "materialId",
      });
    }
  }
  Material.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Sku: {
        type: DataTypes.STRING,
      },
      Descricao: {
        type: DataTypes.STRING,
      },
      Familia1: {
        type: DataTypes.STRING,
      },
      Familia2: {
        type: DataTypes.STRING,
      },
      UnidadesCaixa: {
        type: DataTypes.INTEGER,
      },
      PesoCaixa: {
        type: DataTypes.FLOAT,
      },
      AlturaCaixa: {
        type: DataTypes.INTEGER,
      },
      ComprimentoCaixa: {
        type: DataTypes.INTEGER,
      },
      CaixasPorCamada: {
        type: DataTypes.INTEGER,
      },
      CamadaPorPallet: {
        type: DataTypes.INTEGER,
      },
      DiasValidade: {
        type: DataTypes.INTEGER,
      },
      PesoPallet: {
        type: DataTypes.FLOAT,
      },
      AlturaPallet: {
        type: DataTypes.INTEGER,
      },
      EAN14CX: {
        type: DataTypes.STRING,
      },
      EAN13KG: {
        type: DataTypes.STRING,
      },
      Hierarquia: {
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
      modelName: "Material",
    }
  );
  return Material;
};
