const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const { generalAccessToken, generalRefreshToken } = require('./JWTService');

const createUser = (data, fileData) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, isAdmin, address, phone } = data;
        try {
            const checkEmailUser = await User.findOne({
                email,
            });
            const checkPhoneUser = await User.findOne({
                phone,
            });
            if (checkEmailUser || checkPhoneUser) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                resolve({
                    status: 'OK',
                    message: 'The email or phone is already exists',
                });
            } else {
                const avatar = fileData?.path;
                const hashPassword = bcrypt.hashSync(password, 10);
                const newUser = await User.create({
                    name,
                    email,
                    password: hashPassword,
                    isAdmin,
                    address,
                    phone,
                    avatar,
                });
                if (newUser) {
                    resolve({
                        status: 'OK',
                        message: 'CREATE SUCCESS',
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

const loginUser = (loginInfo) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = loginInfo;
        try {
            const loginUser = await User.findOne({
                email,
            });
            if (!loginUser) {
                resolve({
                    status: 'OK',
                    message: 'The user is not exists',
                });
            }

            const comparePassword = bcrypt.compareSync(password, loginUser.password);
            if (!comparePassword) {
                resolve({
                    status: 'OK',
                    message: 'The email or password is invalid',
                });
            }

            const access_token = await generalAccessToken({
                id: loginUser._id,
                isAdmin: loginUser.isAdmin,
            });
            const refresh_token = await generalRefreshToken({
                id: loginUser._id,
                isAdmin: loginUser.isAdmin,
            });

            resolve({
                status: 'OK',
                message: 'LOGIN SUCCESS',
                access_token,
                refresh_token,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateUser = (_id, data, fileData) => {
    return new Promise(async (resolve, reject) => {
        const { email, phone } = data;
        try {
            const checkPhoneUser = await User.findOne({
                phone,
            });
            if (checkPhoneUser && email !== checkPhoneUser.email) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                resolve({
                    status: 'OK',
                    message: 'The phone number is already exists',
                });
            }

            const checkUser = await User.findOne({
                _id,
            });
            if (!checkUser) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            if (checkUser?.avatar && fileData) {
                var regex = /\/([^\/]+\/[^\/]+\/[^\/]+)\.png$/;
                var match = checkUser.avatar?.match(regex);
                var desiredPart = match[1];
                if (desiredPart) cloudinary.uploader.destroy(desiredPart);
            }

            const avatar = fileData?.path;
            newData = { ...data, avatar };
            const updatedUser = await User.findByIdAndUpdate(_id, newData, {
                new: true,
            });

            resolve({
                status: 'OK',
                message: 'UPDATE SUCCESS',
                data: updatedUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const addToCart = (_id, data) => {
    return new Promise(async (resolve, reject) => {
        const { productId, name, img, price, quantity } = data;
        try {
            const checkUser = await User.findOne({
                _id,
            });
            if (!checkUser) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }
            const existingItem = checkUser.cart.find((item) => item.productId === productId);
            if (existingItem) {
                const temp = parseInt(existingItem.quantity) + quantity;
                existingItem.quantity = temp;
            } else {
                checkUser.cart.push({ productId, name, img, price, quantity });
            }

            const newData = { cart: checkUser.cart };
            const updatedUser = await User.findByIdAndUpdate(_id, newData, {
                new: true,
            });

            resolve({
                status: 'OK',
                message: 'ADD TO CART SUCCESS',
                data: updatedUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteFromCart = (_id, data) => {
    return new Promise(async (resolve, reject) => {
        const { productId } = data;
        try {
            const checkUser = await User.findOne({
                _id,
            });
            if (!checkUser) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }
            const itemIndex = checkUser.cart.findIndex((item) => item.productId === productId);
            if (itemIndex !== -1) {
                checkUser.cart.splice(itemIndex, 1);
            }

            const newData = { cart: checkUser.cart };
            const updatedUser = await User.findByIdAndUpdate(_id, newData, {
                new: true,
            });

            resolve({
                status: 'OK',
                message: 'REMOVE FROM CART SUCCESS',
                data: updatedUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const clearCart = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id,
            });
            if (!checkUser) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            const newData = { cart: [] };
            const updatedUser = await User.findByIdAndUpdate(_id, newData, {
                new: true,
            });

            resolve({
                status: 'OK',
                message: 'CLEAR CART SUCCESS',
                data: updatedUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteUser = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id,
            });
            if (!checkUser) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            if (checkUser?.avatar) {
                var regex = /\/([^\/]+\/[^\/]+\/[^\/]+)\.png$/;
                var match = checkUser.avatar?.match(regex);
                var desiredPart = match[1];
                if (desiredPart) cloudinary.uploader.destroy(desiredPart);
            }

            await User.findByIdAndDelete(_id, { new: true });

            resolve({
                status: 'OK',
                message: 'DELETE SUCCESS',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getDetailsUser = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(_id);
            if (!user) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }
            resolve({
                status: 'OK',
                message: 'GET SUCCESS',
                data: user,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUsers = await User.find();

            resolve({
                status: 'OK',
                message: 'GET ALL SUCCESS',
                data: allUsers,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    addToCart,
    deleteFromCart,
    clearCart,
    deleteUser,
    getDetailsUser,
    getAllUser,
};
