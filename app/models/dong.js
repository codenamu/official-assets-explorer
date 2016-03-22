module.exports = function (sequelize, DataTypes) {

  var Dong = sequelize.define('Dong', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Dong.belongsTo(models.Municipal, {foreignKey: 'municipalId'})
      }
    }
  })

  return Dong
}
