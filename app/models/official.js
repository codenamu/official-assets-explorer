module.exports = function (sequelize, DataTypes) {

  var Official = sequelize.define('Official', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
      }
    }
  });

  return Official;
};

