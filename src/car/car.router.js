module.exports = function(app, Mongoose) {

	const metalSchema = Mongoose.Schema({
		name: String
	});

	const brandSchema = Mongoose.Schema({
		name: String
	});

	const partSchema = Mongoose.Schema({
		name: String,
		metals: [{
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'Metal'
		}]
	});

	const carSchema = Mongoose.Schema({
		name: String,
		parts: [{
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'Part'
		}],
		brand: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'Brand'
		}
	});

	// 5d274c861c27003428dd524e - Platinum
	// 5d274c901c27003428dd524f - Iron
	// 5d274ca11c27003428dd5250 - Aluminum
	// 5d274cac1c27003428dd5251 - Magnesium
	// 5d274cb71c27003428dd5252 - Steel

	// 5d274cc71c27003428dd5253 - Audi
	// 5d274cd31c27003428dd5254 - BMW

	// 5d274d1e1c27003428dd5258 - Engine
	// 5d274d321c27003428dd5259 - Chasis
	// 5d274d711c27003428dd525a - Body
	// 5d27369deabc004228b75165 - Wiring

	const Metal = Mongoose.model("Metal", metalSchema);
	const Brand = Mongoose.model("Brand", brandSchema);
	const Part = Mongoose.model("Part", partSchema);
	const Car = Mongoose.model("Car", carSchema);

	app.get('/api/metals', (req, res) => {
		Metal.find((error, result) => {
			res.status(200).json(result);
		});
	});

	app.post('/api/metal', (req, res) => {
		const metal = {
			name: req.body.name
		};

		Metal.create(metal, (error, result) => {
			res.status(200).json(result);
		});
	});

	app.get('/api/parts', (req, res) => {
		Part.find((error, result) => {
			res.status(200).json(result);
		});
	});

	app.get('/api/parts/populate', (req, res) => {
		Part.find().populate(['metals']).exec((error, result) => {
			res.status(200).json(result);
		});
	});

	app.post('/api/part', (req, res) => {
		const part = {
			name: req.body.name,
			metals: req.body.metals
		};

		Part.create(part, (error, result) => {
			res.status(200).json(result);
		});
	});

	app.get('/api/brands', (req, res) => {
		Brand.find((error, result) => {
			res.status(200).json(result);
		});
	});

	app.post('/api/brand', (req, res) => {
		const brand = {
			name: req.body.name
		};

		Brand.create(brand, (error, result) => {
			res.status(200).json(result);
		});
	});

	app.get('/api/cars', (req, res) => {
		Car.find((error, result) => {
			res.status(200).json(result);
		});
	});

	app.post('/api/car', (req, res) => {
		const car = {
			name: req.body.name,
			brand: req.body.brand,
			parts: req.body.parts
		};

		Car.create(car, (error, result) => {
			res.status(200).json(result);
		});
	});

	app.get('/api/cars/populate', (req, res) => {
		Car.find().populate([{
			path: 'brand',
			model: 'Brand'
		}, {
			path: 'parts',
			model: 'Part',
			populate: {
				path: 'metals',
				model: 'Metal'
			}
		}]).exec((error, result) => {
			res.status(200).json(result);
		});
	});
}