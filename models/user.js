"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "Username can only contain letters and numbers"
        },
        len: {
          args: [3, 30],
          msg: "Username must between 3 and 30 characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: { args: true, msg: "Invalid Email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: "Password must between 5 and 100 characters"
        }
      }
    }
  });

  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: "member",
      foreignKey: { name: "userId", field: "user_id" }
    });
    User.belongsToMany(models.Channel, {
      through: "channel_member",
      foreignKey: { name: "userId", field: "user_id" }
    });
  };

  return User;
};
