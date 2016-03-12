module.exports = function (sequelize, DataTypes) {

  var Asset = sequelize.define('Asset', {
    relation: DataTypes.STRING,
    change: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        Asset.belongsTo(models.Cat_2, {foreignKey: 'cat2Id'})
      }
    }
  })

  return Asset
}

