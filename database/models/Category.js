const Product = require("./Product");

module.exports = (sequelize, DataTypes) => {

    let alias = 'Category'

    let cols = {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING(10),
            allowNull: false,
        }
    };
    let config = {

        // tableName: category,
        timestamps: false,
        /*revisar*/
        underscored: true

    }
    const Category = sequelize.define(alias, cols, config)
    Category.associate = models => {
        Category.hasMany(models.Product,{
            as : "products",
            //sourceKey:'category_id',
            foreignKey:'category_id',
            //timestamps : false
        })
    
}
     return Category
}