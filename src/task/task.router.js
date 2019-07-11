module.exports = function(app, Mongoose) {
	const schema = Mongoose.Schema({
		name: String,
		status: String
	});

	schema.pre('save', function(next) {
		if (this.status == 'To do') {
			this.status = 'Progress';
			console.log(`Neah, you're doing this now not later`);
		}

		next();
	});

	schema.post('save', function(next) {
		if (this.status == 'Done') {
			this.status = 'Testing';
			console.log(`I know it's too late to do this now but, oh well`)
		}

		next();
	});

	const Task = Mongoose.model("Task", schema);

	app.get('/api/tasks', (req, res) => {
		Task.find((error, result) => {
			res.status(200).json(result);
		});
	});

	app.post('/api/task', (req, res) => {
		const task = {
			name: req.body.name,
			status: req.body.status
		};

		Task.create(task, (error, result) => {
			res.status(200).json(result);
		});
	});
}