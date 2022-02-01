const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
	try {
		const products = await Product.find();

		return res.json({
			data: products,
		});
	} catch (err) {
		next(err);
	}
};

exports.getProduct = async (req, res, next) => {
	try {
		const { productId } = req.query;
		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({
				data: 'Product not found',
			});
		}
		return res.json({ data: product });
	} catch (err) {
		next(err);
	}
};

exports.postProduct = async (req, res, next) => {
	try {
		const { name, price } = req.body;

		const product = new Product({
			name,
			price,
		});

		await product.save();

		return res.status(201).json({
			data: 'Product Created Sucessfully',
			id: product._id,
		});
	} catch (err) {
		next(err);
	}
};

exports.patchProduct = async (req, res, next) => {
	try {
		const { productId } = req.query;
		const { name, price } = req.body;

		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({
				data: 'Product not found',
			});
		}

		product.name = name ? name : product.name;
		product.price = price ? price : product.price;

		await product.save();

		return res.status(201).json({ data: 'Product Updated Sucessfully' });
	} catch (err) {
		next(err);
	}
};

exports.deleteProduct = async (req, res, next) => {
	try {
		const { productId } = req.query;

		const product = await Product.findById(productId);

		console.log(product);
		if (!product) {
			return res.status(404).json({
				data: 'Product not found',
			});
		}

		await Product.findOneAndDelete({ _id: productId });

		return res.status(201).json({ data: 'Product Deleted Sucessfully' });
	} catch (err) {
		next(err);
	}
};
