import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import reminder from './reminder.js';
const app = express();
const db = new MongoMemoryServer();

app.use(express.static('dist'));
app.use(express.static('static'));
app.set('db', db);
app.use('/reminder', reminder);

app.get('/create', (req, res) => {
	res.send('Hello World!')
});

app.listen(process.env.PORT || 8080);
