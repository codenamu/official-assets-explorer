module.exports = function (sequelize, DataTypes) {

  var Org2 = sequelize.define('Org2', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        Org2.belongsTo(models.Org1, {foreignKey: 'org1Id'})
      }
    }
  })

  return Org2
}
