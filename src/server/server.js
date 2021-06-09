import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import helmet from 'helmet';
import path from 'path';
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import request from 'superagent';
import cors from 'cors';
import passport from 'passport';
import nodemailer from 'nodemailer';
import sanitize from 'sanitize';
import passportConfig from './passport/passport.js';
import indexRoute from './routes/index/index.js';
import userRoute from './routes/user/user.js';
import Client from '../client/Client.js';
import SearchService from '../search/SearchService.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const client = new Client(request);
const service = new SearchService(client);
const nonAPIRoutes = ['/', '/gallery', '/about', '/contact', '/restaurant', '/user/signup', '/user/login'];

passportConfig(passport);

// Security middleware
app.use(helmet({
	contentSecurityPolicy: false
}));
app.use(sanitize.middleware);

// Connect to MongoDB
mongoose
	.connect(
		process.env.MONGODB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true}
 	)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

const transporter = nodemailer.createTransport({
	host: "smtp-mail.outlook.com",
	port: 587,
	auth: {
		user: process.env.CONTACT_EMAIL,
		pass: process.env.CONTACT_EMAIL_PASSWORD
	},
	debug: process.env.DEBUG === '1',
	logger: process.env.DEBUG === '1'
});

// Verify connection configuration
transporter.verify()
	.then(() => console.log("Email server is ready for messages."))
	.catch((err) => console.log(err));

app.use(cors());
app.use(cookieParser('keyboard cat'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	proxy: true,
	cookie: { secure: process.env.NODE_ENV === 'production' },
	store: MongoStore.create({
		mongoUrl: process.env.MONGODB_URI
	})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', express.static(path.join(process.cwd(), 'public')));
app.use('/', indexRoute(service, transporter));
app.use('/user', userRoute);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(process.cwd(), 'build')));

	nonAPIRoutes.forEach(route => {
		app.get(route, (req, res) => {
			res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
		});
	});
}

app.listen(process.env.PORT || 8080, () => console.log("Gourmand server up and running."));
