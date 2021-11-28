import Order from "../models/orderModel.js"
import AsyncHandler from "express-async-handler"
import { ObjectId } from "mongodb"
// @desc create new order
// @route POST /api/orders
// @access Private

const addOrderItems = AsyncHandler(async (req,res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPric, shippingPrice, totalPrice} = req.body

    if(orderItems && orderItems.lenth === 0){
        res.status(400)
        throw new Error("No order items")
    }
    const order = new Order({ orderItems, shippingAddress, paymentMethod, itemsPrice, taxPric, shippingPrice, totalPrice, user: req.user._id})
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
})

// @desc get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = AsyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        return res.json(order)
    }
    res.status(404)
    throw new Error("Order not found")
})

// @desc update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = AsyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    res.status(404)
    throw new Error("Order not found")
})

// @desc get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = AsyncHandler(async (req,res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
}