module.exports = function (sequelize, DataTypes) {

  var Municipal = sequelize.define('Municipal', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Municipal.belongsTo(models.Province, {foreignKey: 'provinceId'})
      }
    }
  })

  return Municipal
}
