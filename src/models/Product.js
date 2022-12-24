const Sequelize = require('sequelize');
const Datatypes = Sequelize.DataTypes;
const sequelize = require('../../config/database/Connection');

const Product = sequelize.define('Product', {
    name: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    description: {
        type: Datatypes.TEXT,
        allowNull: false,
    },
    price: {
        type: Datatypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    image: {
        type: Datatypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'products',
    timestamps: false
})

Product.sync({ force: false });

module.exports = Product;