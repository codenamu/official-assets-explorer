module.exports = function (sequelize, DataTypes) {

  var Org3 = sequelize.define('Org3', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        Org3.belongsTo(models.Org2, {foreignKey: 'org2Id'})
      }
    }
  })

  return Org3
}
