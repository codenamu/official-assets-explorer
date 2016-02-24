module.exports = function (sequelize, DataTypes) {

  var Org_2 = sequelize.define('Org_2', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Org_2.belongsTo(models.Org_1, {foreignKey: 'org1Id'});
        Org_2.belongsToMany(models.Org_3, {through: 'Position', foreignKey: 'org2Id'});
      }
    }
  });

  return Org_2;
};
