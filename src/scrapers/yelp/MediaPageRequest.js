import cheerio from 'cheerio';
import YelpMedia from "./YelpMedia.js";
import unescapeHTMLEntities from "../../utils/unescapeHTMLEntities.js";

class MediaPageRequest {

    constructor(client) {
        this.client = client;
    }

    send(restaurant, startIndex) {
        return makePhotoPageRequest(this.client, formatPhotoPageURL(restaurant.getPhotoPageURL(), startIndex))
            .then(response => response.body)
            .then(getMediaFromJSON);
    }

}

function makePhotoPageRequest(client, photoPageURL) {
    console.log("Making request to:", photoPageURL);
    return client
        .get(photoPageURL)
        .set("x-requested-with", "XMLHttpRequest")
        .catch(err => console.error("Error making photo page request:", err));
}

function formatPhotoPageURL(photoPageURL, startIndex) {
    return `${photoPageURL}&start=${startIndex}`;
}

function getMediaFromJSON(json) {
    // console.log("json:", json);
    if (json.thumbnails) {
        const $ = cheerio.load(json.thumbnails);
        const images = $('img');
        // console.log("images.length:", images.length);
        const urls = getURLs($, images);
        // console.log("urls:", urls);
        return urls.map((url, i) => {
            return new YelpMedia(
                getPhotoID(url),
                'photo',
                getCaption($(images[i]).attr("alt")),
                url
            );
        });
    }

    return [];
}

function getURLs($, images) {
    const urls = [];
    images.each((i, el) => urls.push($(el).attr("src")));
    // console.log("urls:", urls);
    return urls
        // Reformat URLs to return original image
        .map(url => {
            const lastSlashIndex = url.lastIndexOf("/");
            return url.slice(0, lastSlashIndex + 1) + "o.jpg";
        })
}

function getPhotoID(url) {
    const split = url.split("/");
    return split[split.length - 2];
}

function getCaption(alt) {
    if (alt) {
        const split = alt.split(". ");

        if (split.length > 1) {
            return unescapeHTMLEntities(split.slice(1)
                .map(text => text.trim())
                .join(". "));
        }
    }

    return null;
}

export default MediaPageRequest;
