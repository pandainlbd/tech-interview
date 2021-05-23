import express from 'express';
const router = express.Router();

router.get('/get-range', async (req, res) => {
	const db = req.app.get('db');
	const remindersCol = db.collection('reminders');

	const query = {};

	if (req.query.from || req.query.to) {
		query.datetime = {};

		if (req.query.from)
			query.datetime.$gte = new Date(req.query.from);

		if (req.query.to)
			query.datetime.$lt = new Date(req.query.to);
	}

	const data = await remindersCol.find(query).toArray();

	res.json(data);
});

router.get('/create', (req, res) => {
	res.send('Hello Reminder!');
});

export default router;
