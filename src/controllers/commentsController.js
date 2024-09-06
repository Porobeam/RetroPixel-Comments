const controller = {};
const Comment = require('../models/schema');

// Function to get the last comment ID
async function getLastCommentId() {
    try {
        // Find the last comment and sort by ID in descending order
        const lastComment = await Comment.findOne().sort({ id: -1 });
        if (lastComment) {
            return lastComment.id;
        } else {
            return 0; // No comments yet
        }
    } catch (error) {
        console.error('ERROR OBTAINING LAST ID, INFORM DEV', error);
        throw error;
    }
}

// Controller to read comments
controller.read = async (req, res) => {
    try {
        // Get all comments and sort by ID in descending order
        const comments = await Comment.find().sort({ id: -1 });
        res.render('read', { comments }); 
    } catch (error) {
        console.error('ERROR READING COMMENTS: ', error);
        res.status(500).send('ERROR READING COMMENTS');
    }
};

// Controller to create new comments
controller.create = async (req, res) => {
    try {
        // Get the last comment ID
        const lastCommentId = await getLastCommentId();

        // Create a new comment with the next sequential ID
        const newComment = new Comment({
            id: lastCommentId + 1,
            author: req.body.author,
            comment: req.body.comment,
            color: req.body.color,
            date: new Date().toISOString()
        });

        // Save the new comment to the database
        await newComment.save();

        // Redirect to the comments page
        res.redirect('/read');
    } catch (error) {
        console.error('ERROR CREATING NEW COMMENT, CONTACT DEV: ', error);
        res.status(500).send('ERROR CREATING NEW COMMENT');
    }
};

module.exports = controller;
