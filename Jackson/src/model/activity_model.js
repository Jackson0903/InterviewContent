module.exports = (dbConnection, sequelize) => {
    const activity = dbConnection.define('User_Activity', {
        Table_Id : {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Userid : {
            type: sequelize.INTEGER,
            allowNull: true
        },
        Type : {
            type: sequelize.STRING(1000),
            allowNull: false
        },
        Location : {
            type: sequelize.TEXT,
            allowNull: true
        },
        CreatedAt : {
            type: sequelize.DATE,
            allowNull: false
        },
        CreatedBy : {
            type: sequelize.INTEGER,
            allowNull: true
        }
    },  {
            freezeTableName : true,
            timestamps : false
    })
    return activity
}
