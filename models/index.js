import Sequelize from "sequelize";

const dbConfig = require("../config/config").db;

const sequelize = new Sequelize(dbConfig.url, {
  host: "localhost",
  dialect: "postgres",
  operatorsAliases: false,
  define: { underscored: true }
});

const models = {
  User: sequelize.import("./user"),
  Channel: sequelize.import("./channel"),
  Message: sequelize.import("./message"),
  Team: sequelize.import("./team")
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
