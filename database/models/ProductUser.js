module.exports = (sequelize, DataTypes) => {

    let alias = 'ProductUser'

    let cols = {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            foreignKey: true
        },
        product_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            foreignKey: true
        }
    };
    let config = {

        tableName: roles,
        timestamps: false,
        /*revisar*/
        underscored: true

    }
    const ProductUser = sequelize.define(alias, cols, config)
    return ProductUser
}