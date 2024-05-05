module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "student",
    },
    information: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    research: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profilepic: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "defaultprofile.png",
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Meetings, {
      foreignKey: "studentId",
      onDelete: "cascade",
    });
    Users.hasMany(models.Meetings, {
      foreignKey: "facultyId",
      onDelete: "cascade",
    });
    Users.hasMany(models.Ranks, {
      as: "GivenRanks",
      foreignKey: "rankerId",
      onDelete: "cascade",
    });
    Users.hasMany(models.Ranks, {
      as: "ReceivedRanks",
      foreignKey: "rankedId",
      onDelete: "cascade",
    });
  };

  return Users;
};
