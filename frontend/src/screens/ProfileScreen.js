import React, {useEffect, useState} from 'react'
import { Form, Button, Col, Row, Table} from "react-bootstrap"
import { useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUserDetails } from '../actions/userActions'
import { listMyOrders } from "../actions/orderActions"
import { LinkContainer } from "react-router-bootstrap"
import {USER_UPDATE_RESET} from "../constants/userConst"

const ProfileScreen = ({ history, location }) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const {loading, error, user} = useSelector(state => state.userDetails)
    const {loading:loadingOrders, error:errorOrders, orders} = useSelector(state => state.orderListMy)

    const {userInfo} = useSelector(state => state.userLogin)
    const {success} = useSelector(state => state.userUpdate)

    useEffect(() => {
        if (!userInfo){
            history.push("/login")
        }else{
            if(!user || !user.name || success){
                dispatch({ type: USER_UPDATE_RESET })
                dispatch(getUserDetails("profile"))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [user, dispatch, userInfo, history])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passwords do not match")
        }else{
            if(password !== "" ){
                dispatch(updateUserDetails({ name, email, password }))
            }else{
                dispatch(updateUserDetails({ name, email }))
            }
        }
        
    }

    return <Row>
        <Col md={3}>
        <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password Address</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>

                <Button style={{marginTop: "15px"}} type="submit" variant="primary">Update Profile</Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                    <i className="fas fa-times" style={{color: "red"}}></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (
                                    <i className="fas fa-times" style={{color: "red"}}></i>
                                    
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm" variant="light">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
}

export default ProfileScreen
