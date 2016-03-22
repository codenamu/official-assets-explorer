module.exports = function (sequelize, DataTypes) {

  var Position = sequelize.define('Position', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Position.belongsTo(models.Org3, {foreignKey: 'org3Id'})
      }
    }
  })

  return Position
}
