"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "message",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      text: { type: DataTypes.STRING }
    },
    { underscored: true }
  );

  Message.associate = models => {
    // 1:M
    Message.belongsTo(models.Channel, {
      foreignKey: "channelId"
    });
    Message.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  return Message;
};
