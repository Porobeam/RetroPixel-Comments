const controller = {};
const Comment = require('../models/schema');

async function getLastCommentId()
{
    try
    {
        const lastComment = await Comment.findOne().sort({ id: -1 });
        if (lastComment)
        {
            return lastComment.id;
        }
        else
        {
            return 0;
        }
    }
    catch (error)
    {
        console.error('ERROR OBTAINING LAST ID, INFORM DEV', error);
        throw error;
    }
}

controller.read = async (req, res) => {
    try
    {
        const comments = await Comment.find();
        res.render('read', { comments }); 
    }
    catch (error)
    {
        console.error('ERROR READING COMMENTS: ', error);
        res.status(500).send('ERROR READING COMMENTS');
    }
};

controller.create = async (req, res) =>
{
    try
    {
        const lastCommentId = await getLastCommentId();

        const newComment = new Comment({
            id: lastCommentId + 1,
            author: req.body.author,
            comment: req.body.comment,
            color: req.body.color,
            date: new Date().toISOString()
        });

        await newComment.save();

        res.redirect('/read');
    } 
    catch (error)
    {
        console.error('ERROR CREATING NEW COMMENT, CONTACT DEV: ', error);
        res.status(500).send('ERROR CREATING NEW COMMENT');
    }
};

module.exports = controller;
