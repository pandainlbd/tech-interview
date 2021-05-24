import express from 'express';
const router = express.Router();

router.get('/get-range', async (req, res) => {
	const db = req.app.get('db');
	const remindersCol = db.collection('reminders');

	const query = {};

	if (req.query.from || req.query.to) {
		query.datetime = {};

		if (req.query.from)
			query.datetime.$gte = new Date(+req.query.from);

		if (req.query.to)
			query.datetime.$lt = new Date(+req.query.to);
	}

	const data = await remindersCol.find(query).toArray();

	res.json(data);
});

router.post('/create', async (req, res) => {
	const {
		name,
		description,
		datetime,
		reminder_color
	} = req.body;

	if (!name || !datetime)
		return res.json({ err: 'Please enter at least a name and a time' });

	const db = req.app.get('db');
	const remindersCol = db.collection('reminders');
	await remindersCol.insertOne({
		name,
		description,
		datetime: new Date(datetime),
		reminder_color: reminder_color
	});
	res.json({ success: true });
});

export default router;
