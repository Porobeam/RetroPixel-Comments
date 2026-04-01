document.addEventListener("DOMContentLoaded", function() {
    let comments = document.querySelectorAll('.comment');

    comments.forEach(function(comment) {
        let backgroundColor = window.getComputedStyle(comment).backgroundColor;
        comment.style.backgroundColor = applyOpacity(backgroundColor);
    });

    function applyOpacity(color) {
        let opacity = 0.75;
        if (color.startsWith('rgb(')) {
            return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
        }
        return color;
    }

    document.addEventListener("click", function(e) {
        let leftZone = window.innerWidth * 0.50;
        if (e.clientX <= leftZone) {
            window.location.href = "/";
        }
    });
});