function unescapeHTMLEntities(str) {
    return str.replace(/&amp;/g, "&");
}

export default unescapeHTMLEntities;
