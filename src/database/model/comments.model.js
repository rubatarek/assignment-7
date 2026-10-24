import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";


export const commentModel = sequelize.define("comments", {
content:{
    type: DataTypes.STRING,
    required: true
},
content:{
    type: DataTypes.STRING,
    required: true,
},
userId:{
    type: DataTypes.INTEGER,
    required: true,
     references:{
        model: "users",
        key: "id"
    }
},
postId:{
    type: DataTypes.INTEGER,
    required: true,
     references:{
        model: "posts",
        key: "id"
    }
}

}, {
    tableName: 'comments'
})
