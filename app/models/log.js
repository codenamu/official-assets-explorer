module.exports = function (sequelize, DataTypes) {
  var Log = sequelize.define('Log', {
    ip: DataTypes.STRING,
    browserInfo: DataTypes.TEXT,
    data: DataTypes.STRING
  }, {
    timestamps: true,
    classMethods: {
      associate: function (models) {
        // example on how to add relations

      }
    }
  })

  return Log
}
