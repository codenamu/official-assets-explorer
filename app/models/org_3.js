module.exports = function (sequelize, DataTypes) {

  var Org_3 = sequelize.define('Org_3', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Org_3.belongsTo(models.Org_2, {foreignKey: 'org2Id'});
      }
    }
  });

  return Org_3;
};
