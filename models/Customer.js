const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Customer model
class Customer extends Model {}
// create fields/columns for Post model
Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "customer",
  }
);

module.exports = Customer;
