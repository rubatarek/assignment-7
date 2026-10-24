import { Router } from "express";
import { postModel } from "../../database/model/posts.model.js";
import { userModel } from "../../database/model/users.model.js";
import { commentModel } from "../../database/model/comments.model.js";
import { sequelize } from "../../database/connection.js";


const router = Router();


router.get('/posts/comment-count', async (req, res) => {
    let posts = await postModel.findAll({
        attributes: ['id', 'title',
            [sequelize.fn('COUNT', sequelize.col('Comments.id')), 'commentCount']
        ],
        include: [{ model: commentModel, attributes: [] }],
        group: ['Post.id']
    });

    res.json(posts);
});

router.get('/posts/details', async (req, res) => {
    let posts = await postModel.findAll({
        attributes: ['id', 'title'],
        include: [
            { model: userModel, attributes: ['id', 'name'] },
            { model: commentModel, attributes: ['id', 'content'] }
        ]
    });

    res.json(posts);
});


router.post('/posts', async (req, res) => {
    try {
        let { title, content, userId } = req.body;
        let existUser = await userModel.findByPk(userId);
        if (!existUser) {
            return res.json({ message: 'User with this ID does not exist' });
        }
        let newPost = new postModel({ title, content, userId });
        await newPost.save();

        if (newPost) {
            res.json({ message: 'Post added successfully', newPost });
        } else {
            return res.json({ message: 'Failed to add post' });
        }
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            return res.json({ message: error.errors[0].message });
        }
        return res.json({ message: error.message });
    }
});



router.delete('/posts/:postId', async (req, res) => {
    let { postId } = req.params;
    let { userId } = req.body ;

    let deletedPost = await postModel.findByPk(postId);
    if (!deletedPost) {
        return res.json({ message: 'Post not found.' });
    }

    if (deletedPost.userId != parseInt(userId)) {
        return res.json({ message: 'You are not authorized to delete this post.' });
    }

    await deletedPost.destroy();
    res.json({ message: 'Post deleted.' });
});

  





export default router;