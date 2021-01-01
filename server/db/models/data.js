module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define(
    "data",
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
    Data.belongsTo(models.stock);
  };

  return Data;
};
