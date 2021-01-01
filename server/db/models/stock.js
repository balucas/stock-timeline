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
  
  Stock.associate = (models) => {
    Stock.hasMany(models.data);
  }

  return Stock;
};
