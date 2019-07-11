module.exports = function(app, Mongoose) {

	// String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map
	const schema = Mongoose.Schema({
		name: String,
		age: Number,
		// required, min, max, enum, unique, validate
		isAdmin: {
			type: Boolean,
			required: true
		}
	});

	const User = Mongoose.model("User", schema);

	/**
	 * Get all the users from the database.
	 */
	app.get('/api/users', (req, res) => {
		User.find((error, result) => {
			res.status(200).json(result);
		});
	});

	/**
	 * Create a new user into the database.
	 */
	app.post('/api/user', (req, res) => {
		const user = {
			name: req.body.name | 'Shadow',
			age: req.body.age | 100,
			isAdmin: req.body.isAdmin | false
		};

		User.create(user, (error, result) => {
			res.status(200).json(result);
		});
	});

	/**
	 * Get an user by it's id.
	 */
	app.get('/api/user/:id', (req, res) => {
		User.findById(req.params.id, (error, result) => {
			res.status(200).json(result);
		});
	});

	/**
	 * Remove all users from the database.
	 */
	app.delete('/api/users', (req, res) => {
		User.remove((error, result) => {
			res.status(200).json(result);
		});
	});

	app.delete('/api/user/:id', (req, res) => {
		User.remove({
			_id: req.params.id
		}, (error, result) => {
			res.status(200).json(result);
		});
	});

	app.put('/api/user/:id', (req, res) => {
		const user = {
			name: req.body.name,
			age: req.body.age,
			isAdmin: req.body.isAdmin
		};

		User.findOneAndUpdate({
			_id: req.params.id
		}, user, { new: true }, (error, result => {
			res.status(200).json(result);
		}));
	});

	// $gt, $lt, $in, limit, sort, select, 
	app.get('/api/user/find', (req, res) => {
		User.find({
			age: {
				$gt: 10,
				$lt: 50
			}
		}, (error, result) => {
			res.status(200).json(result);
		});
	});

	// Model.deleteMany()
	// Model.deleteOne()
	// Model.find()
	// Model.findById()
	// Model.findByIdAndDelete()
	// Model.findByIdAndRemove()
	// Model.findByIdAndUpdate()
	// Model.findOne()
	// Model.findOneAndDelete()
	// Model.findOneAndRemove()
	// Model.findOneAndUpdate()
	// Model.replaceOne()
	// Model.updateMany()
	// Model.updateOne()
}