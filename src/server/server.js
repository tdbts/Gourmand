import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import request from 'superagent';
import Client from '../client/Client.js';
import SearchService from '../search/SearchService.js';
const app = express();
const client = new Client(request);
const service = new SearchService(client);

// Connect to MongoDB
mongoose
	.connect(
		process.env.MONGODB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true}
 	)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(process.cwd(), 'build')));

	app.get('*', function (req, res) {
		res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
	});
}

app.get('/search', function (req, res) {
	const { location, description, distance } = req.query;
	console.log("location:", location);
	console.log("description:", description);
	console.log("distance:", distance);  // Distance remains a string (thus, truthy) until array lookup
	return service.find({location, description, distance})
		.then(restaurants => res.json(restaurants))
		.catch(e => {
			console.error("Something went wrong during search request.");
			console.error(e);
			res.send(500);
		});
});

app.listen(process.env.PORT || 8080, () => console.log("Gourmand server up and running."));
