module.exports = function (sequelize, DataTypes) {

  var Official = sequelize.define('Official', {
    openId    : DataTypes.STRING,     // 공개id
    page      : DataTypes.INTEGER,     // 원본 자료 페이지
    year      : DataTypes.INTEGER,
    pdfUrl    : DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Official.belongsTo(models.Person, {foreignKey: 'personId'})
        Official.belongsTo(models.Position, {foreignKey: 'positionId'})
        Official.hasMany(models.Asset, {foreignKey: 'officialId'})
      }
    }
  })

  return Official
}

