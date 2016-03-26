module.exports = function (sequelize, DataTypes) {

  var Constituency = sequelize.define('Constituency', {
    name      : DataTypes.STRING,
    uniqueId  : DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Constituency.hasMany(models.Person, {foreignKey: 'ConstituencyId'})
        Constituency.belongsToMany(models.Dong, {through: 'ConstituencyDong'})
      }
    }
  })

  return Constituency
}
