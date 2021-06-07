import express from 'express';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;
import reminder from './reminder.js';

const app = express();
// const mongod = new MongoMemoryServer();
const uri = "mongodb+srv://swoonz:128r7fbr@cluster0.8oblv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
console.log('DB at:', uri);
const mongoClient = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
await mongoClient.connect();
const db = mongoClient.db('tech-interview');

// Add some fake data
const remindersCol = db.collection('reminders');
// remindersCol.drop();

app.use(express.static('dist'));
app.use(express.static('static'));
app.use(bodyParser.json());
app.set('db', db);
app.use('/reminder', reminder);

app.listen(process.env.PORT || 8080);
