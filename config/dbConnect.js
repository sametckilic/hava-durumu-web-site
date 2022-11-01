const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('havadurumudb', 'postgres', 'admin123', {
    host: 'havadurumudb.cd6xjyimi7xu.us-east-1.rds.amazonaws.com',
    dialect: 'postgres'
  });

sequelize.authenticate()  // DB CONNECTION TEST
.then(()=>console.log("DB connected.")).catch(err => console.log(err));

  module.exports = sequelize;

