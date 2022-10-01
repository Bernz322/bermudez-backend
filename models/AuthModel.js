module.exports = (sequelize, DataTypes) => {
    const AuthModel = sequelize.define(
        "auth",
        {
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            middlename: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            birthday: {
                type: DataTypes.STRING(1234),
                allowNull: false,
            },
            img: {
                type: DataTypes.STRING(1234),
                allowNull: false,
            },
            sex: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(1234),
                allowNull: false,
            },
            occupation: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nearestKin: {
                type: DataTypes.STRING(1234),
                allowNull: true,
            },
            relationship: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            occupation2: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    return AuthModel;
};