module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define(
    "stock",
    {
      symbol: DataTypes.STRING,
      name: DataTypes.STRING,
      sector: DataTypes.STRING,
      industry: DataTypes.STRING,
      description: DataTypes.TEXT 
    },
    {}
  );

  return Stock;
};
