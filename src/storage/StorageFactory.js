import LocalStorage from './LocalStorage.js';
import NullStorage from './NullStorage.js';

export default class StorageFactory {

	get(localStorage) {
		return localStorage ? new LocalStorage(localStorage) : new NullStorage();
	}

}
