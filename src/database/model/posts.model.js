import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";


export const postModel = sequelize.define("posts", {
    
title:{
    type: DataTypes.STRING,
    allowNull: false
},
content:{
    type: DataTypes.STRING,
    allowNull: false,
},
userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
     references:{
        model: "users",
        key: "id"
    }
}

}, {
    paranoid: true,
    tableName: 'posts'
})
