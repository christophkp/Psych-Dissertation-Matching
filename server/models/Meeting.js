module.exports = (sequelize, DataTypes) => {

    const Meetings = sequelize.define("Meetings", {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
    },
    });



    return Meetings;
}