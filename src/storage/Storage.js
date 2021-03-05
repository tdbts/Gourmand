/*
 * Storage
 *
 * Facade for storage mechanism (e.g. localStorage) 
 */
export default class Storage {

	constructor(storage) {
		this.storage = storage;
	}

	get(key) {
		return silent(() => this.storage.getItem(key));
	}

	set(key, prop) {
		return silent(() => this.storage.setItem(key, prop));
	}

	remove(key) {
		return silent(() => this.storage.removeItem(key));
	}

	removeAll() {
		return silent(() => this.storage.clear());
	}

}

/*
 * Utility Functions
 */
function silent(action) {
	try {
		return action();
	} catch (e) {
		window.console.debug("Storage Exception:", e);
	}
}
