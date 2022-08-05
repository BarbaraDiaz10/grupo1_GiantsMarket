module.exports = (sequelize, DataTypes) => {

    let alias = 'Rol'

    let cols = {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        role_name: {
            type: DataTypes.STRING(10),
            allowNull: false,
        }
    };
    let config = {

        // tableName: roles,
        timestamps: false,
        /*revisar*/
        underscored: true

    }
    const Rol = sequelize.define(alias, cols, config)
    Rol.associate = models => {
        Rol.hasMany(models.User, {
            as: "users",
            foreignKey: 'id'
        })

    }
    return Rol
}