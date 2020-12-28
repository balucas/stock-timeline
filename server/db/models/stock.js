module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define(
    "stock",
    {
      symbol: DataTypes.STRING,
      companyName: DataTypes.STRING,
      sector: DataTypes.STRING,
      industry: DataTypes.STRING,
    },
    {}
  );

  return Stock;
};
