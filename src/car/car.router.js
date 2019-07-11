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

	// 5d27351974b2390698161ba4 - Platinum
	// 5d27352174b2390698161ba5 - Iron
	// 5d27352c74b2390698161ba6 - Aluminum
	// 5d27353274b2390698161ba7 - Magnesium
	// 5d27353e74b2390698161ba8 - Steel

	// 5d2736e634505048e02b7486 - Audi
	// 5d2736eb34505048e02b7487 - BMW

	// 5d2735f5ce802625e49443ed - Engine
	// 5d273632eabc004228b75163 - Chasis
	// 5d273681eabc004228b75164 - Body
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