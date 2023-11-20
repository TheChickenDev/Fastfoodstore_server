const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        const response = await OrderService.createOrder(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const data = req.body;
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required',
            });
        }
        const response = await OrderService.updateOrder(orderId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const response = await OrderService.getAllOrder();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

module.exports = {
    createOrder,
    updateOrder,
    getAllOrder,
};
