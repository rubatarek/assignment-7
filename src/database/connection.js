import { Sequelize } from 'sequelize';
import { env } from '../../config/env.service.js';


 export const  sequelize = new Sequelize(env.databaseName, env.databaseUser, env.databasePassword, {
  host: 'localhost',
  dialect: 'mysql'
});

export const databaseConnection = async  () => {

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

}

export const databaseSync=async() => {   
try{
    const { userModel } =  await import('./model/users.model.js');
    const { postModel } =  await import('./model/posts.model.js');
    const{ commentModel } =  await import('./model/comments.model.js');
    const { setupAssociations } = await import('./associations.js');
    await setupAssociations();
    await sequelize.sync({ force: true }); 
}catch(error){
    console.log(error);
}


}