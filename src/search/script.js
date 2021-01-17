import request from 'superagent';
import SearchService from './SearchService';
const location = "Brooklyn, NY 11219";
const service = new SearchService(request);

service.start()
	.then(() => service.find(location))
	.then(restaurants => console.log("restaurants:", restaurants))
	.catch(e => console.log("e:", e));
