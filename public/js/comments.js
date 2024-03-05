document.addEventListener("DOMContentLoaded", function()
{
    let comments = document.querySelectorAll('.comment');

    comments.forEach(function(comment)
    {
        let backgroundColor = comment.style.backgroundColor;
        comment.style.backgroundColor = applyOpacity(backgroundColor);
    });

    function applyOpacity(color)
    {
        let opacity = 0.75;
        let rgbaColor = color.replace(')', ', ' + opacity + ')').replace('rgb', 'rgba');
        return rgbaColor;
    }
});
