/*
 Client
 
 Facade around 3rd-party request module.  Sets 'Referer', 'User-Agent', and 'x-requested-with' headers on each request in order to ensure unblocked data requests.
 
 */
export default class Client {

	constructor(request) {
		this.request = request;
	}

	get(url) {
		return this.request
			.get(url)
			.set('Referer', getReferrer())
			.set('User-Agent', getUserAgent())
			.set("x-requested-with", "XMLHttpRequest");
	}

}

function getReferrer() {
	return "http://localhost:3000";
}

function getUserAgent() {
	return "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36";
}
