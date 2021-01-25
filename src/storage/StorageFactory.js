import Storage from './Storage.js';
import NullStorage from './NullStorage.js';

export default class StorageFactory {

	get(localStorage) {
		return localStorage ? new Storage(localStorage) : new NullStorage();
	}

}
