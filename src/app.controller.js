import express from "express";
import { databaseConnection ,databaseSync} from "./database/connection.js";
import userRouter from "./module/users/users.controller.js";

import postRouter from "./module/posts/posts.controller.js";
import commentRouter from "./module/comments/comments.controller.js";
import { env } from "../config/env.service.js";

 
export const bootstrap = async () => {
    
const app = express();

app.use(express.json());

await databaseConnection();
await databaseSync();

app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.listen(env.port, () => {

    console.log("Server is running on port 3000");  


})
}