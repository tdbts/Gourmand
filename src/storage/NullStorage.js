/*
 * NullStorage
 *
 * Class returned by 'StorageFactory' if there is no local storage.
 */
export default class NullStorage {
	get() {}
	set() {}
	remove() {}
	removeAll() {}
}
