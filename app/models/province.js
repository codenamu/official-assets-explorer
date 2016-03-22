module.exports = function (sequelize, DataTypes) {

  var Province = sequelize.define('Province', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
      }
    }
  })

  return Province
}
