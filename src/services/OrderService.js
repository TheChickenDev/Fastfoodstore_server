const Order = require('../models/OrderModel');

const createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        const { customerId, date, products, totalAmount, note, paymentMethod, isCompleted } = data;
        try {
            const newOrder = await Order.create({
                customerId,
                date,
                products,
                totalAmount,
                note,
                paymentMethod,
                isCompleted,
            });
            if (newOrder) {
                resolve({
                    status: 'OK',
                    message: 'ORDER SUCCESS',
                    data: newOrder,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const updateOrder = (_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await Order.findOne({
                _id,
            });
            if (!checkOrder) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                });
            }

            const updatedOrder = await Order.findByIdAndUpdate(_id, data, {
                new: true,
            });

            resolve({
                status: 'OK',
                message: 'UPDATE SUCCESS',
                data: updatedOrder,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrders = await Order.find();

            resolve({
                status: 'OK',
                message: 'GET ALL SUCCESS',
                data: allOrders,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createOrder,
    updateOrder,
    getAllOrder,
};
