

module.exports = (sequelize, DataTypes) => {

    let alias = 'ProductUser'

    let cols = {
        product_user_id: {
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

        // tableName: roles,
        timestamps: false,
        /*revisar*/
        underscored: true

    }
    const ProductUser = sequelize.define(alias, cols, config)


    /*ProductUser.associate = models => {
        ProductUser.belongsToMany(models.product,{
            as : "products",
            foreignKey:'product_id',
            timestamps : false
        })
    }*/

    /*ProductUser.associate = models =>{
        User.belongsToMany(models.User, {
            as: 'users',
            foreignKey : 'user_id',
            timestamps: false

        });
    }*/
    return ProductUser
}