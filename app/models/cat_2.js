module.exports = function (sequelize, DataTypes) {

  var Cat_2 = sequelize.define('Cat_2', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Cat_2.belongsTo(models.Cat_1, {foreignKey: 'cat1Id'});
      }
    }
  });

  return Cat_2;
};
