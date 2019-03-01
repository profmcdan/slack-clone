"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING
  });

  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: "member",
      foreignKey: "userId"
    });
  };

  return User;
};
