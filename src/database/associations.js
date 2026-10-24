export const setupAssociations = async () => {
    const { userModel } = await import('./model/users.model.js');
    const { postModel } = await import('./model/posts.model.js');
    const { commentModel } = await import('./model/comments.model.js');
    
    userModel.hasMany(postModel, { foreignKey: 'userId' });
    postModel.belongsTo(userModel, { foreignKey: 'userId' });

    
    userModel.hasMany(commentModel, { foreignKey: 'userId' });
    commentModel.belongsTo(userModel, { foreignKey: 'userId' });

    
    postModel.hasMany(commentModel, { foreignKey: 'postId' });
    commentModel.belongsTo(postModel, { foreignKey: 'postId' });
};
