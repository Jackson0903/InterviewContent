module.exports = (dbConnection, sequelize) => {
    const Message = dbConnection.define('Message', {
        Table_Id : {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        SenderId : {
            type: sequelize.INTEGER,
            allowNull: true
        },
        ReceiverId : {
            type: sequelize.INTEGER,
            allowNull: false
        },
        Data : {
            type: sequelize.TEXT,
            allowNull: false
        },
        CreatedAt : {
            type: sequelize.DATE,
            allowNull: false 
        },
        CreatedBy : {
            type: sequelize.INTEGER,
            allowNull: false
        },
        Deleted : {
            type : sequelize.STRING(50),
            default : "No"
        },
        status : {
            type: sequelize.TEXT,
        }
    },  {
            freezeTableName : true,
            timestamps : false
    })
    return Message
}
