const dbConfig = require('../config')
const sequelize = require('sequelize')
const dbConnection = new sequelize(
    dbConfig.dbname,
    dbConfig.username,
    dbConfig.password,
    {
        dialect: dbConfig.dialect,
        host: dbConfig.hostname,
        logging: false,
        "timezone": "+05:30"
    }
)
const connectDB = async () => {
    try {
        await dbConnection.authenticate()
        console.log('Database connection established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        process.exit(1) 
    }
}
connectDB()

const db = {}
db.dbConnection = dbConnection
db.sequelize = sequelize

db.user = require('./user_model')(dbConnection, sequelize)
db.activity = require('./activity_model')(dbConnection, sequelize)
db.message = require('./message_model')(dbConnection, sequelize)
module.exports = db