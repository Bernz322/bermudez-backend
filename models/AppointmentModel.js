module.exports = (sequelize, DataTypes)=>{
    const AppointmentModel = sequelize.define(
      "appointment",
      {
        ClientFirstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ClientMiddlename:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        ClientLastname:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        Address: {
          type: DataTypes.STRING(1234),
          allowNull: false,
        },
        AppointmentDate: {
          type: DataTypes.STRING(1234),
          allowNull: false,
        },
        AppointmentStatus: {
          type: DataTypes.STRING,
          defaultValue: "Pending",
          allowNull: true,
        },
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );

    return AppointmentModel;
}