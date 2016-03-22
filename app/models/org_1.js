module.exports = function (sequelize, DataTypes) {

  var Org1 = sequelize.define('Org1', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        Org1.belongsTo(models.Publisher, {foreignKey: 'publisherId'})
      }
    }
  })

  return Org1
}
