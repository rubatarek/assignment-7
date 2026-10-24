import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

 export const userModel = sequelize.define("user", {

name: {
   type:DataTypes.STRING,
   allowNull: false
},
email:{
    type:DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    }
},
password:{
    type:DataTypes.STRING,
    allowNull: false,
    validate: {
        checkPasswordLength(value) {
            if (value.length <= 6) {
                throw new Error('Password length must be greater than 6 characters');
            }
        }
    }
},
role:{
    type:DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
}
}, {
    tableName: 'users'
})