import { Router } from "express";
import { postModel } from "../../database/model/posts.model.js";
import { userModel } from "../../database/model/users.model.js";
import{ commentModel } from "../../database/model/comments.model.js";


const router = Router();


router.post('/comments', async (req, res) => {
  try {
    const { comments } = req.body; 
    await commentModel.bulkCreate(comments);
    res.json({ message: "comments created." });
  } catch (err) {
    res.json({ message: "error", error: err.message });
  }
});

router.patch('/comments/:commentId', async (req, res) => {
    let { commentId } = req.params;
    let { userId, content } = req.body;

    let comment = await commentModel.findByPk(commentId);
    if (!comment) {
        return res.json({ message: 'comment not found.' });
    }

    if (comment.userId != parseInt(userId)) {
        return res.json({ message: 'You are not authorized to update this comment.' });
    }

    comment.content = content;
    await comment.save();
    res.json({ message: 'Comment updated.' });
});

router.post('/comments/find-or-create', async (req, res) => {
    let { postId, userId, content } = req.body;

    let [comment, created] = await commentModel.findOrCreate({
        where: { postId, userId, content }
    });

    res.json({ comment, created });
});

router.get('/comments/search', async (req, res) => {
    let { word } = req.query;

    let comments = await commentModel.findAll();

    let filtered = comments.filter(c =>
        c.content.toLowerCase().includes(word.toLowerCase())
    );

    if (filtered.length === 0) {
        return res.json({ message: 'no comments found.' });
    }

    res.json({ count: filtered.length, comments: filtered });
});

  
router.get('/comments/newest/:postId', async (req, res) => {
    let { postId } = req.params;

    let comments = await commentModel.findAll({
        where: { postId },
        order: [['createdAt', 'DESC']],
        limit: 3,
        attributes: ['id', 'content', 'createdAt']
    });

    res.json(comments);
});


router.get('/comments/details/:id', async (req, res) => {
    let { id } = req.params;

    let comment = await commentModel.findByPk(id, {
        include: [
            { model: userModel, attributes: ['id', 'name', 'email'] },
            { model: postModel, attributes: ['id', 'title', 'content'] }
        ]
    });

    if (!comment) {
        return res.json({ message: 'no comment found' });
    }

    res.json(comment);
});


export default router;