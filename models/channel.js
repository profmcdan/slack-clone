"use strict";
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define("channel", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    text: { type: DataTypes.STRING },
    public: DataTypes.BOOLEAN
  });

  Channel.associate = models => {
    // 1:M
    Channel.belongsTo(models.Team, {
      foreignKey: "teamId"
    });
  };

  return Channel;
};
