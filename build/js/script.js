var size = 192,
    articleContent = $('.article-text');
    
for (elem of articleContent) {
    articleText  = $(elem).text();
    if (articleText.length > size) {
        $(elem).text(articleText.slice(0, size) + '...');
    }
}


var seeMoreButton, seeMoreButtonCollapse;
updateButtons();

for (button of seeMoreButton) {
    button.onclick = (event) => {
        target = event.target;
        if ($(target).hasClass('reviews-table__see-more-button_expand')) {
            expandText(event);
            target.classList.remove('reviews-table__see-more-button_expand');
            target.classList.add('reviews-table__see-more-button_collapse');
        } else {
            collapseText(event); 
            target.classList.remove('reviews-table__see-more-button_collapse');
            target.classList.add('reviews-table__see-more-button_expand');
        }
        // 
        // button.classList.add('reviews-table__see-more-button_collapse');
        // button.onclick = collapseText(); 
    }
}

function expandText(ev) {
    let siblings = ev.target.parentElement.children;
    let content, index;
    for (elem of siblings) {
        if ($(elem).hasClass('article-text')) {
            content = $(elem);
            let siblingsArray = Array.prototype.slice.call(siblings);
            index = siblingsArray.indexOf(elem);
        }
    }
    let articleText = articleContent.text();
    $(content).text(articleText.slice(0, articleText.length));
}

function collapseText(ev) {
    let siblings = ev.target.parentElement.children;
    for (elem of siblings) {
        if ($(elem).hasClass('article-text')) content = $(elem);
    }
    let articleText = articleContent.text();
    $(content).text(articleText.slice(0, size) + '...');
}

function updateButtons() {
    seeMoreButton = $('.reviews-table__see-more-button_expand');
    seeMoreButtonCollapse = $('.reviews-table__see-more-button_collapse');
}


//# sourceMappingURL=script.js.map
