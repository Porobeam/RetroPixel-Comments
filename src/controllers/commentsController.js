const controller = {};

const fs = require('fs');
const path = require('path');
const jsonDirectory = path.join(__dirname, '..', 'data', 'comments.json');

function hexToRgb(hex, brightnessFactor = 1) { 
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.floor(r * brightnessFactor);
    g = Math.floor(g * brightnessFactor);
    b = Math.floor(b * brightnessFactor);

    return { r, g, b };
}

// Read comments from the JSON file and send them as a response.
controller.read = (req, res) => {
    fs.readFile(jsonDirectory, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments file');
        }
        let comments = JSON.parse(data).comments;

        comments = comments.map(comment => {

            const rgb = hexToRgb(comment.color);
            comment.colorRGB = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.75)`; // Añade la opacidad de 0.75
            return comment;
        });

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