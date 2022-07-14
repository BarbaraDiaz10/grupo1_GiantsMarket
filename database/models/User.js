module.exports = (sequelize, DataTypes) => {

    let alias = 'User'

    let cols = {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        role_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            foreignKey: true /*preguntar si es correcto*/
        },
        first_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        admin: {
            type: DataTypes.STRING(10),
            allowNull: false,
        }
    };
    let config = {

        tableName: users,
        timestamps: false,
        /*revisar*/
        underscored: true

    }
    const User = sequelize.define(alias, cols, config)
    return User
}