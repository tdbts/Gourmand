import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import request from 'superagent';
import cors from 'cors';
import nodemailer from 'nodemailer';
import Client from '../client/Client.js';
import SearchService from '../search/SearchService.js';
const app = express();
const client = new Client(request);
const service = new SearchService(client);
const nonSearchRoutes = ['/', '/gallery', '/about', '/contact', '/login'];

// Connect to MongoDB
mongoose
	.connect(
		process.env.MONGODB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true}
 	)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	auth: {
		user: process.env.CONTACT_EMAIL,
		pass: process.env.CONTACT_EMAIL_PASSWORD
	}
});

// verify connection configuration
transporter.verify()
	.then(() => console.log("Email server is ready for messages."))
	.catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/search', function (req, res) {
	const { location, description, distance } = req.query;
	console.log("location:", location);
	console.log("description:", description);
	console.log("distance:", distance);  // Distance remains a string (thus, truthy) until array lookup
	return service.find({location, description, distance})
		.then(restaurants => {
			res.setHeader('Content-Type', 'application/json');
			res.json(restaurants);
		})
		.catch(e => {
			console.error("Something went wrong during search request.");
			console.error(e);
			res.send(500);
		});
});

app.post('/contact', (req, res) => {
	console.log("New message incoming.");
	console.log(req.body);
	const { name, email, subject, message: text } = req.body;
	const emailConfig = {
		from: `${name} <${email}>`,
		to: process.env.CONTACT_EMAIL,
		subject,
		text
	};

	console.log("JSON.stringify(emailConfig)", JSON.stringify(emailConfig));

	transporter.sendMail(emailConfig)
		.then(() => {
			console.log("Message successfully sent.");
			res.json({status: 'success'});
		})
		.catch((err) => {
			console.error("Message error:", err);
			res.json({status: 'failure', message: err.message});
		});
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(process.cwd(), 'build')));

	nonSearchRoutes.forEach(route => {
		app.get(route, function (req, res) {
			res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
		});
	});
}

app.listen(process.env.PORT || 8080, () => console.log("Gourmand server up and running."));
