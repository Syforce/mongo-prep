module.exports = function(app, Mongoose) {
	const schema = Mongoose.Schema({
		name: String,
		race: String
	}, {
		toJSON: {
			virtuals: false
		}
	});

	schema.query.containsName = function(name) {
		return this.where({
			name: {
				$regex: name,
				$options: 'i'
			}
		});
	};

	schema.virtual('hello').get(function() {
		return `Hello, my name is ${this.name}`;
	});

	const Dog = Mongoose.model("Dog", schema);


	/**
	 * Get all the dogs from the database.
	 */
	app.get('/api/dogs', (req, res) => {
		Dog.find((error, result) => {
			res.status(200).json(result);
		});
	});

	/**
	 * Create a new user into the database.
	 */
	app.post('/api/dog', (req, res) => {
		const dog = new Dog({
			name: req.body.name,
			race: req.body.race
		});

		dog.save((error, result) => {
			res.status(200).json(result);
		});
	});

	app.get('/api/dogs/hello', (req, res) => {
		Dog.find((error, result) => {
			result.forEach((dog) => {
				console.log(dog.hello);
			});

			res.status(200).json(result);
		});
	});

	app.get('/api/dogs/:name', (req, res) => {
		Dog.find().containsName(req.params.name).exec((error, result) => {
			res.status(200).json(result);
		});
	});
}