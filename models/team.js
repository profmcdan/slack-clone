"use strict";
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("team", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: { type: DataTypes.STRING, unique: true }
  });

  Team.associate = models => {
    Team.belongsToMany(models.User, {
      through: "member",
      foreignKey: "teamId"
    });
    Team.belongsTo(models.User, {
      foreignKey: "owner"
    });
  };

  return Team;
};
