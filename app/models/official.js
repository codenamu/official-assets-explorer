module.exports = function (sequelize, DataTypes) {

  var Official = sequelize.define('Official', {
    year: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Official.belongsTo(models.Person, {foreignKey: 'personId'})
        Official.belongsTo(models.Position, {foreignKey: 'positionId'})
        Official.hasMany(models.Asset, {foreignKey: 'officialId'})
      }
    }
  })

  return Official
}

