module.exports = (sequelize, DataTypes) => {

    const Meetings = sequelize.define("Meetings", {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      faculty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },
    });



    return Meetings;
}