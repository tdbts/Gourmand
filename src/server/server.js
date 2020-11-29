const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const SearchService = require('../search/SearchService');
const app = express();
// app.use(express.static(path.join(__dirname, 'build')));

app.get('/search', function (req, res) {
	const { location, description } = req.query;
	console.log("location:", location);
	console.log("description:", description);
	return res.send('Soich');
});

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(process.env.PORT || 8080, () => console.log("Gourmand server up and running."));
