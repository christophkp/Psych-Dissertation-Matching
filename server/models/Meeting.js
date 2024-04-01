module.exports = (sequelize, DataTypes) => {

    const Meetings = sequelize.define("Mettings", {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      faculty: {
        type: DataTypes.STRING,
        allowNull: false,

      }
     
    });

    return Users;
}