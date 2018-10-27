const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '97ab3f65a5c74cb18c95caac6c0527a9'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries') 
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get count for entries'))
}

module.exports = {
	handleImage,
	handleApiCall
};