module.exports = (sequelize, DataTypes) => {
  const Meetings = sequelize.define("Meetings", {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
  });

  Meetings.associate = (models) => {
    Meetings.belongsTo(models.Users, { foreignKey: "studentId" });
    Meetings.belongsTo(models.Users, { foreignKey: "facultyId" });
  };

  return Meetings;
};
