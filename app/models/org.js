module.exports = function (sequelize, DataTypes) {

  var Org = sequelize.define('Org', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        Org.belongsTo(models.Publisher, {foreignKey: 'publisherId'})
      }
    }
  })

  return Org
}
