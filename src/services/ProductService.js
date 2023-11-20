const Product = require('../models/ProductModel');
const cloudinary = require('cloudinary').v2;

const createProduct = (data, fileData) => {
    return new Promise(async (resolve, reject) => {
        const { name, desc, type, price } = data;
        try {
            const checkNameProduct = await Product.findOne({
                name,
            });
            if (checkNameProduct) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                resolve({
                    status: 'OK',
                    message: 'The product is already exists',
                });
            } else {
                const img = fileData?.path;
                const newProduct = await Product.create({
                    name,
                    desc,
                    type,
                    price,
                    img,
                });
                if (newProduct) {
                    resolve({
                        status: 'OK',
                        message: 'CREATE SUCCESS',
                        data: newProduct,
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

const updateProduct = (_id, data, fileData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id,
            });
            if (!checkProduct) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                });
            }

            if (checkProduct?.img) {
                var regex = /\/([^\/]+\/[^\/]+\/[^\/]+)\.png$/;
                var match = checkProduct.img?.match(regex);
                var desiredPart = match[1];
                if (desiredPart) cloudinary.uploader.destroy(desiredPart);
            }

            const img = fileData?.path;
            newData = { ...data, img };
            const updatedProduct = await Product.findByIdAndUpdate(_id, newData, {
                new: true,
            });

            resolve({
                status: 'OK',
                message: 'UPDATE SUCCESS',
                data: updatedProduct,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteProduct = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id,
            });
            if (!checkProduct) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                });
            }

            if (checkProduct?.img) {
                var regex = /\/([^\/]+\/[^\/]+\/[^\/]+)\.png$/;
                var match = checkProduct.img?.match(regex);
                var desiredPart = match[1];
                if (desiredPart) cloudinary.uploader.destroy(desiredPart);
            }

            await Product.findByIdAndDelete(_id, { new: true });

            resolve({
                status: 'OK',
                message: 'DELETE SUCCESS',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getDetailsProduct = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(_id);
            if (!product) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                });
            }

            resolve({
                status: 'OK',
                message: 'GET SUCCESS',
                data: product,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProducts = await Product.find();

            resolve({
                status: 'OK',
                message: 'GET ALL SUCCESS',
                data: allProducts,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const searchProduct = (name, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProducts = await Product.find({
                $and: [
                    { name: { $regex: new RegExp(name, 'i') } },
                    { type: { $regex: `${type}` } },
                    // { tags: { $elemMatch: { $in: [str] } } },
                ],
            });

            resolve({
                status: 'OK',
                message: 'GET ALL SUCCESS',
                data: allProducts,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailsProduct,
    getAllProduct,
    searchProduct,
};
