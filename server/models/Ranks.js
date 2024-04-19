module.exports = (sequelize, DataTypes) => {
  const Ranks = sequelize.define("Ranks", {
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Ranks.associate = (models) => {
    Ranks.belongsTo(models.Users, {
      foreignKey: "rankerId",
    });
    Ranks.belongsTo(models.Users, {
      foreignKey: "rankedId",
    });
  };

  return Ranks;
};
