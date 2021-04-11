import _ from'underscore';
import unescapeHTMLEntities from "../utils/unescapeHTMLEntities.js";

export default class Media {

	constructor(id, type, caption, source) {
		this.id = id;
		this.type = type;
		this.caption = caption ? unescapeHTMLEntities(caption) : null;
		this.source = source;
	}

	toJSON() {
		return _.pick(this, 'id', 'type', 'caption', 'source');
	}

}
