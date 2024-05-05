module.exports = (sequelize, DataTypes) => {
  const Ranks = sequelize.define("Ranks", {
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentBody: {
      type: DataTypes.STRING,
    },
  });

  Ranks.associate = (models) => {
    Ranks.belongsTo(models.Users, {
      as: "Ranker",
      foreignKey: "rankerId",
    });
    Ranks.belongsTo(models.Users, {
      as: "Ranked",
      foreignKey: "rankedId",
    });
  };

  return Ranks;
};
