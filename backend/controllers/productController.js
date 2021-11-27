import Product from "../models/productModel.js"
import AsyncHandler from "express-async-handler"

// @desc fetch all products
// @route GET /api/products
// @access Public

const getProducts = AsyncHandler(async (req,res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc fetch single products
// @route GET /api/products/:id
// @access Public
const getProductById = AsyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("Product not found")
    }
    res.json(product)
})

export {
    getProducts,
    getProductById
}