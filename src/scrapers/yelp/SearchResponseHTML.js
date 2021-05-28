import cheerio from 'cheerio';

class SearchResponseHTML {

    constructor(text) {
        this.text = text;
    }

    parse() {
        console.log("Parsing search response HTML for restaurant data.");
        const $ = cheerio.load(this.text);
        const jsonEl = getJSONScriptElement($);
        const json = getJSONFromScript($, jsonEl);
        return getSearchSnippetDataFromJSON(json);
    }
}

function getJSONScriptElement($) {
    const applicationScripts = $('script[type="application/json"]');
    // console.log("applicationScripts:", applicationScripts);
    const jsonEl = applicationScripts
        .filter((i, el) => 'hypernovaKey' in $(el).data())[0];
    // console.log("jsonEl:", jsonEl);
    return jsonEl;
}

function getJSONFromScript($, jsonEl) {
    const jsonStr = $(jsonEl).html().slice(4, -3);
    // console.log("jsonStr:", jsonStr);
    const json = JSON.parse(jsonStr);
    // console.log("json:", json);
    return json;
}

function getSearchSnippetDataFromJSON(json) {
    try {
        return json.legacyProps.searchAppProps;
    } catch (e) {
        console.log("Cannot get restaurant data from unexpected JSON format.");
        throw e;
    }

}

export default SearchResponseHTML;
