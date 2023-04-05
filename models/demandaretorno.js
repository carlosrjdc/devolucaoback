"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DemandaRetorno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      DemandaRetorno.hasMany(models.Conferencia, {
        as: "demanda",
        foreignKey: "demandaId",
      });

      DemandaRetorno.belongsTo(models.User, {
        as: "operador",
        foreignKey: "operadorId",
      });

      DemandaRetorno.belongsTo(models.User, {
        as: "conferente",
        foreignKey: "conferenteId",
      });
    }
  }
  DemandaRetorno.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      operadorId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      conferenteId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      referencia_viagem: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      tipo: {
        type: DataTypes.STRING,
      },
      placa: {
        type: DataTypes.STRING,
      },
      doca: {
        type: DataTypes.STRING,
      },
      inicio_descarga: {
        type: DataTypes.STRING,
      },
      fim_descarga: {
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
      modelName: "DemandaRetorno",
    }
  );
  return DemandaRetorno;
};
