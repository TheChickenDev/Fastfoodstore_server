const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authUserMiddleware } = require('../middlewares/authMiddleware');
const { uploadUserCloud } = require('../middlewares/uploadMiddleware');

router.post('/sign-up', uploadUserCloud.single('image'), userController.createUser);
router.post('/sign-in', userController.loginUser);
router.post('/log-out', userController.logoutUser);
router.put('/update/:id', uploadUserCloud.single('image'), userController.updateUser);
router.post('/add-to-cart/:id', userController.addToCart);
router.post('/delete-from-cart/:id', userController.deleteFromCart);
router.post('/clear-cart/:id', userController.clearCart);
router.delete('/delete/:id', userController.deleteUser);
router.get('/details/:id', authUserMiddleware, userController.getDetailsUser);
router.get('/get-all', userController.getAllUser);
router.post('/refresh-token', userController.refreshToken);

module.exports = router;
