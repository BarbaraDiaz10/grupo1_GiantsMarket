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
            allowNull: true
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
        image: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
    };
    let config = {

        // tableName: users,
        timestamps: false,
        /*revisar*/
        underscored: true

    }
    const User = sequelize.define(alias, cols, config)
    User.associate = models => {
        User.belongsTo(models.Rol, {
            as: "roles",
            foreignKey: 'role_id',
            otherKey: 'id'
        })
        User.associate = models => {
            User.belongsToMany(models.Product, {
                through: 'product_users',
                foreignKey: 'id',
                otherKey: 'product_id',
                timestamps: false

            })
        }

    }
    return User
}