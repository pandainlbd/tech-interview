import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
const app = express();
const mongod = new MongoMemoryServer();

mongod.getInstanceInfo();

app.use(express.static('dist'));
app.use(express.static('static'));

app.get('/', (req, res) => {
	res.send('Hello World!')
});

app.listen(process.env.PORT || 8080);
