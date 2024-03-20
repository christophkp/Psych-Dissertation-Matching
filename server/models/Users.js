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
        defaultValue: "",
      },
      research: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
    });

    return Users;
}