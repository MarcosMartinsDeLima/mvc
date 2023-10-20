const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('mvc','root','',{
    dialect: 'mysql',
    host:'localhost'
})

sequelize.authenticate()
module.exports = sequelize