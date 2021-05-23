import express from 'express';
import bodyParser from 'body-parser';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;
import reminder from './reminder.js';

const app = express();
const mongod = new MongoMemoryServer();
const uri = await mongod.getUri();
const mongoClient = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
await mongoClient.connect();
const db = mongoClient.db('tech-interview');

// Add some fake data
const remindersCol = db.collection('reminders');
remindersCol.insertMany([
	{
		name: 'Do shopping',
		description: 'Remember to buy milk, eggs, and bread.',
		datetime: new Date(+new Date() + 1000 * 60 * 60 * 3),
	}, {
		name: 'Call Bob',
		description: 'Regarding the client meeting.',
		datetime: new Date(+new Date() + 1000 * 60 * 60 * 28),
	},
]);

app.use(express.static('dist'));
app.use(express.static('static'));
app.use(bodyParser.json());
app.set('db', db);
app.use('/reminder', reminder);

app.listen(process.env.PORT || 8080);
