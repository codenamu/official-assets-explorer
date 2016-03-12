module.exports = function (sequelize, DataTypes) {

  var Person = sequelize.define('Person', {
    name: DataTypes.STRING,
    uniqueId: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
      }
    }
  })

  return Person
}

