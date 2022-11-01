const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect.js");

const City = sequelize.define("CITY", {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  PLAKA: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  SEHIRADI: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  DERECE: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  }
  
},{
  tableName: 'CITY'
});

module.exports = City;