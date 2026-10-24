import dotenv from "dotenv";
dotenv.config({path: './config/.env'});

const port=process.env.PORT 
const databaseName=process.env.DATABASENAME
const databaseUser=process.env.DATABASEUSER
const databasePassword=process.env.DATABASEPASSWORD


export const env={
    port,   
    databaseName,
    databaseUser,
    databasePassword
}