import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import reminder from './reminder.js';
const app = express();
const db = new MongoMemoryServer();

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
app.set('db', db);
app.use('/reminder', reminder);

app.get('/create', (req, res) => {
	res.send('Hello World!')
});

app.listen(process.env.PORT || 8080);
