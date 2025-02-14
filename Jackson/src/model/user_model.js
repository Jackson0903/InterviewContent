module.exports = (dbConnection, sequelize) => {
    const user = dbConnection.define('user', {
        UserId  : {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserName : {
            type: sequelize.STRING(1000),
            allowNull: true
        },
        Password : {
            type: sequelize.TEXT,
            allowNull: false
        },
        email : {
            type: sequelize.STRING(1000),
            allowNull: false
        },
        Token : {
            type: sequelize.TEXT,
            allowNull: true
        },
        CreatedDate : {
            type: sequelize.DATE,
            allowNull: false
        }
    },  {
            freezeTableName : true,
            timestamps : false
    })
    return user
}
