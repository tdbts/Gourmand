import { Html5Entities } from 'html-entities';

function unescapeHTMLEntities(str) {
    return Html5Entities.decode(str);
}

export default unescapeHTMLEntities;
