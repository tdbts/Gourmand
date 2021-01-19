import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import request from 'superagent';
import Client from '../client/Client.js';
import SearchService from '../search/SearchService.js';
const app = express();
const client = new Client(request);
const service = new SearchService(client);
const service = new SearchService(request);

const __dirname = path.resolve(path.dirname(''));
console.log("__dirname:", __dirname);

app.use(express.static(path.join(__dirname, './build')));

app.get('/', function (req, res) {
  console.log("req:", req);
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.get('/search', function (req, res) {
	const { location, description } = req.query;
	console.log("location:", location);
	console.log("description:", description);
	return service.find(location, description)
		.then(restaurants => res.json(restaurants))
		.catch(e => console.error(e));
});

app.listen(process.env.PORT || 8080, () => console.log("Gourmand server up and running."));
