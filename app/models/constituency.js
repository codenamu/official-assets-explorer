module.exports = function (sequelize, DataTypes) {

  var Constituency = sequelize.define('Constituency', {
    name      : DataTypes.STRING,
    uniqueId  : DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Constituency.hasMany(models.Dong, {foreignKey: 'constituencyId'})
        Constituency.hasMany(models.Person, {foreignKey: 'constituencyId'})
      }
    }
  })

  return Constituency
}
