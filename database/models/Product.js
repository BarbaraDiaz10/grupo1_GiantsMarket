module.exports = (sequelize, DataTypes) => {

    let alias = 'Product'

    let cols = {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            //foreignKey: true
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
            allowNull: true,
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
    Product.associate = models => {
        Product.belongsTo(models.Category, {
            as: "category",
            //targetKey:'category_id',
            foreignKey: 'category_id',
            otherKey: 'id'
                //timestamps : false
        })

        Product.belongsToMany(models.User, {
            as: "users",
            through: "product_users",
            foreignKey: 'product_id',
            otherKey: 'user_id',
            timestamps: false
        })
    }
    return Product
}