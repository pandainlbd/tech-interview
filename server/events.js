import express from 'express';
const router = express.Router();

router.get('/create', (req, res) => {
	res.send('Hello Event!');
});

export default router;
