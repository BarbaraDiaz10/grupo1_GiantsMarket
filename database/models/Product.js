const { productCart } = require("../../controllers/productsController");

module.exports = (sequelize, DataTypes) => {

    let alias = 'Product'

    let cols = {
        product_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            foreignKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description_detail: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        discount: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        transferable: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        stock: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        shipping: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER(100),
            allowNull: false,
        }
    };
    let config = {

        // tableName: products,
        timestamps: false,
        /*revisar*/
        underscored: true

    }
    const Product = sequelize.define(alias, cols, config);
    /*Product.associate = models => {
        Product.belongsTo(models.category,{
            as : "categories",
            foreignKey:'category_id',
            timestamps : false
        })

        Product.associate = models => {
            Product.belongsToMany(models.productUser,{
                as : "productUsers",
                foreignKey:'product_user_id',
                timestamps : false
            })
        }
    }*/
    return Product
}