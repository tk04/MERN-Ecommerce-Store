import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConst'


const ProductEditScreen = ({ history, match }) => {
    const productId = match.params.id

    const [price, setPrice] = useState(0)
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [countInStock, setCountInStock] = useState(0)

    const dispatch = useDispatch()

    const { loading, error, product } = useSelector(state => state.productDetails)
    const { loading: loadingUpdate, error: errorUpdate, success:successUpdate } = useSelector(state => state.productUpdate)

    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push(`/admin/productList`)
        }else{
            if(!product || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [history, dispatch, product, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))

    }

    return (
        <>
            <Link to="/admin/productList" className="btn btn-light my-3">Go Back</Link>
        <FormContainer>
            <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" placeholder="Enter Image URL" value={image} onChange={e => setImage(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={e => setBrand(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="countInStock">
                    <Form.Label>Count in Stock</Form.Label>
                    <Form.Control type="number" placeholder="Enter count in stock" value={countInStock} onChange={e => setCountInStock(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Enter Category" value={category} onChange={e => setCategory(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Description"> 
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" value={description} onChange={e => setDescription(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Button style={{marginTop: "15px"}} type="submit" variant="primary">Update</Button>
            </Form>

            )}
        </FormContainer>
        </>
    )
}

export default ProductEditScreen
