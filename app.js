const express = require('express');
const mongoose = require('mongoose');

const productRouter = require('./routes/product');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res, next) => {
	return res.json({ status: 'ok' });
});

app.use('/api', productRouter);

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ data: 'Something Went Wrong' });
});

mongoose
	.connect(
		'mongodb+srv://admin:admin12345@mern-auth-ititech.gusxu.mongodb.net/products?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log('[APP.JS Connected to database');
	})
	.catch(err => console.log(err));

app.listen(3000, () => {
	console.log('[APP.JS] Server Staterd At http://localhost:3000');
});
