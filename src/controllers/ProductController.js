const ProductService = require('../services/ProductService');
const cloudinary = require('cloudinary').v2;

const createProduct = async (req, res) => {
    try {
        const fileData = req.file;
        const response = await ProductService.createProduct(req.body, fileData);
        return res.status(200).json(response);
    } catch (error) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return res.status(404).json({
            message: error,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        const fileData = req.file;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required',
            });
        }
        const response = await ProductService.updateProduct(productId, data, fileData);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required',
            });
        }
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required',
            });
        }
        const response = await ProductService.getDetailsProduct(productId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const response = await ProductService.getAllProduct();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const searchProduct = async (req, res) => {
    try {
        const { name, type } = req.query;
        const response = await ProductService.searchProduct(name, type);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailsProduct,
    getAllProduct,
    searchProduct,
};
