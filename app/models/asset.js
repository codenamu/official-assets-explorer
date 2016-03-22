module.exports = function (sequelize, DataTypes) {

  var Asset = sequelize.define('Asset', {
    relation      : DataTypes.STRING,       // 본인과의 관계
    change        : DataTypes.INTEGER,        // 증감액
    prevTotal     : DataTypes.INTEGER,  // 종전가액
    total         : DataTypes.INTEGER,         // 현재가액
    description   : DataTypes.TEXT,    // 소재지 면적 등 권리 등의 명세
    reason        : DataTypes.TEXT            // 변동 사유
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        Asset.belongsTo(models.Cat2, {foreignKey: 'cat2Id'})
      }
    }
  })

  return Asset
}

