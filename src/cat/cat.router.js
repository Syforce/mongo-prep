module.exports = function(app, Mongoose) {
	const schema = Mongoose.Schema({
		name: String,
		type: String
	});

	schema.methods.findSimilar = function(callback) {
		return this.model('Cat').find({
			type: this.type
		}, callback);
	};

	schema.methods.countSimilar = function(callback) {
		return this.model("Cat").count({
			type: this.type
		}, callback);
	};

	const Cat = Mongoose.model("Cat", schema);

	/**
	 * Get all the cats from the database.
	 */
	app.get('/api/cats', (req, res) => {
		Cat.find((error, result) => {
			res.status(200).json(result);
		});
	});

	/**
	 * Get a cat by it's id.
	 */
	app.get('/api/cat/:id', (req, res) => {
		Cat.findById(req.params.id, (error, result) => {
			res.status(200).json(result);
		});
	});

	/**
	 * Get all the cats similar with the cat I want.
	 */
	app.get('/api/cat/:id/similar', (req, res) => {
		Cat.findById(req.params.id, (error, cat) => {
			cat.findSimilar((error, result) => {
				res.status(200).json(result);
			});
		});
	});

	/**
	 * Create a new user into the database.
	 */
	app.post('/api/cat', (req, res) => {
		const cat = new Cat({
			name: req.body.name,
			type: req.body.type
		});

		cat.countSimilar((error, result) => {
			console.log(`There are ${result} similar cats in the database`);

			cat.save((error, result) => {
				res.status(200).json(result);
			});
		});
	});

	/**
	 * Remove all the cats from the database.
	 */
	app.delete('/api/cats', (req, res) => {
		Cat.remove((error, result) => {
			res.status(200).json(result);
		});
	});
};