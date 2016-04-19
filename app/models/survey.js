module.exports = function (sequelize, DataTypes) {

  var Survey = sequelize.define('Survey', {
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    region: DataTypes.STRING,
    job: DataTypes.STRING,
    purpose: DataTypes.STRING,
    purposeDetail: DataTypes.TEXT
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {

      }
    }
  })

  return Survey
}
