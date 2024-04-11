module.exports = (sequelize, DataTypes) => {

    const Ranks = sequelize.define("Ranks", {
      rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rankedId: {
        type: DataTypes.INTEGER,
        allowNull: false,

      }

    });

    return Ranks;
}