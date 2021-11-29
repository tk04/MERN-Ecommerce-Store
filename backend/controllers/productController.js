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


// @desc delete product
// @route DELETED /api/products/:id
// @access Public/Admin
const deleteProduct = AsyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("Product not found")
    }
    await product.remove()
    res.json({message: "Product removed"})
})


// @desc create product
// @route POST /api/products
// @access Public/Admin
const createProduct = AsyncHandler(async (req,res) => {
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: "images/sample.jpeg",
        brand: "Sample brand",
        category:"Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description"
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)


})


// @desc update product
// @route PUT /api/products/:id
// @access Public/Admin
const updateProduct = AsyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("Product not found")
    }
    const {name, price, description, image, brand, category, countInStock} = req.body
    const updates = Object.keys(req.body).filter(value => value !== "_id")

    updates.forEach(update => product[update] = req.body[update])
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct

}