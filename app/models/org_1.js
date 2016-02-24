module.exports = function (sequelize, DataTypes) {

  var Org_1 = sequelize.define('Org_1', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Org_1.hasMany(models.Org_2);
      }
    }
  });

  return Org_1;
};

