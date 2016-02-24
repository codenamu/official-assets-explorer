module.exports = function (sequelize, DataTypes) {

  var Asset = sequelize.define('Asset', {
    year: DataTypes.INTEGER,
    relation: DataTypes.STRING,
    change: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        Asset.belongsTo(models.Cat_2, {foreignKey: 'cat2Id'});
        Asset.belongsTo(models.Org_3, {foreignKey: 'org3Id'});
        Asset.belongsTo(models.Official, {foreignKey: 'officialId'});
      }
    }
  });

  return Asset;
};

