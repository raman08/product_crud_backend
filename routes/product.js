const express = require('express');
const productController = require('../controller/product');
const router = express.Router();

router.get('/', (req, res, next) => {
	return res.json({ data: 'API STATUS OK' });
});
router.get('/products', productController.getProducts);

router.get('/product', productController.getProduct);

router.post('/product', productController.postProduct);

router.patch('/product', productController.patchProduct);

router.delete('/product', productController.deleteProduct);

module.exports = router;
