module.exports = function (sequelize, DataTypes) {

  var Publisher = sequelize.define('Publisher', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
      }
    }
  })

  return Publisher
}
