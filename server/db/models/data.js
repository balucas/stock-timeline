module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define(
    "Data",
    {
      open: DataTypes.DECIMAL,
      close: DataTypes.DECIMAL,
      high: DataTypes.DECIMAL,
      low: DataTypes.DECIMAL,
      date: DataTypes.DATEONLY,
    },
    {}
  );

  Data.associate = (models) => {
    Data.belongsTo(models.Stock, {
      foreignKey: "stockId",
      onDelete: "CASCADE",
    });
  };

  return Data;
};
