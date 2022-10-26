const User = require("./User");
const Order = require("./Order");
const Customer = require("./Customer");

User.hasMany(Customer, {
  foreignKey: "user_id",
});

Customer.belongsTo(User, {
  foreignKey: "user_id",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
});

Order.belongsTo(Customer, {
  foreignKey: "customer_id",
});

User.hasMany(Order, {
  foreignKey: "user_id",
});

Customer.hasMany(Order, {
  foreignKey: "Customer_id",
});

module.exports = { User, Order, Customer };
