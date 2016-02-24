module.exports = function (sequelize, DataTypes) {

  var Cat_1 = sequelize.define('Cat_1', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Cat_1.hasMany(models.Cat_2);
      }
    }
  });

  return Cat_1;
};

