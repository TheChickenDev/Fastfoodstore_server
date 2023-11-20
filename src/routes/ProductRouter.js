const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const { uploadProductCloud } = require('../middlewares/uploadMiddleware');

router.post('/create', uploadProductCloud.single('image'), productController.createProduct);
router.put('/update/:id', uploadProductCloud.single('image'), productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/details/:id', productController.getDetailsProduct);
router.get('/get-all', productController.getAllProduct);
router.get('/search', productController.searchProduct);

module.exports = router;
