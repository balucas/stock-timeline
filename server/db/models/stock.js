module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define(
    "stock",
    {
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
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
