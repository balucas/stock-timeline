module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
    "news",
    {
      source: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      url: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      date: DataTypes.DATEONLY,
    },
    {}
  );

  News.associate = (models) => {
    News.belongsTo(models.stock);
  };

  return News;
};
