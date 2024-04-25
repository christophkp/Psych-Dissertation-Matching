module.exports = (sequelize, DataTypes) => {
  const Meetings = sequelize.define("Meetings", {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
  });


  return Meetings;
};
