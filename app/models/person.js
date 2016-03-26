module.exports = function (sequelize, DataTypes) {

  var Person = sequelize.define('Person', {
    name            : DataTypes.STRING,
    profileImage    : DataTypes.STRING,
    uniqueId        : DataTypes.STRING,
    election        : DataTypes.BOOLEAN
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Person.belongsTo(models.Constituency)
      }
    }
  })

  return Person
}

