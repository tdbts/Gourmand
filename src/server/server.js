import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import request from 'superagent';
import Client from '../client/Client.js';
import SearchService from '../search/SearchService.js';
const app = express();
const client = new Client(request);
const service = new SearchService(client);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(process.cwd(), 'build')));

	app.get('/', function (req, res) {
		res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
	});
}

app.get('/search', function (req, res) {
	const { location, description } = req.query;
	console.log("location:", location);
	console.log("description:", description);
	return service.find(location, description)
		.then(restaurants => res.json(restaurants))
		.catch(e => console.error(e));
});

app.listen(process.env.PORT || 8080, () => console.log("Gourmand server up and running."));
