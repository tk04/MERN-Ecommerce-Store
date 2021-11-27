import React, {useEffect, useState} from 'react'
import { Form, Button, Col, Row} from "react-bootstrap"
import { useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUserDetails } from '../actions/userActions'

const ProfileScreen = ({ history, location }) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const {loading, error, user} = useSelector(state => state.userDetails)
    const {userInfo} = useSelector(state => state.userLogin)
    const {success} = useSelector(state => state.userUpdate)

    useEffect(() => {
        if (!userInfo){
            history.push("/login")
        }else{
            if(!user.name){
                dispatch(getUserDetails("profile"))
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
        </Col>
    </Row>
}

export default ProfileScreen
