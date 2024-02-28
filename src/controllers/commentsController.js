const controller = {};

const fs = require('fs');
const path = require('path');
const jsonDirectory = path.join(__dirname, '..', 'data', 'comments.json');

// Read comments from the JSON file and send them as a response.
controller.read = (req, res) => {
    fs.readFile(jsonDirectory, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments file');
        }
        const comments = JSON.parse(data).comments;
        res.render('comments', { comments });
    });
};

// Add a new comment to the JSON file and redirect to /read.
controller.create = (req, res) => {
    const requestBody = req.body; 
    
    const newComment = {
        id: null, 
        author: requestBody.author, 
        comment: requestBody.comment,
        color: requestBody.color,
        date: new Date().toISOString(), 
    };
    
    fs.readFile(jsonDirectory, (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments file');
            return;
        }
        
        const comments = JSON.parse(data).comments;
        
        newComment.id = comments.length > 0 ? comments[comments.length - 1].id + 1 : 1;    
        newComment.date = new Date().toISOString();

        comments.push(newComment);
    
        fs.writeFile(jsonDirectory, JSON.stringify({ comments }, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing comments file');
                return;
            }
            
            res.redirect('/read');
        });
    });
};



module.exports = controller;