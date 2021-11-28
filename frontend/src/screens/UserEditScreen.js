import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, editUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import {USER_EDIT_RESET} from "../constants/userConst"


const UserEditScreen = ({ history, match }) => {
    const userId = match.params.id

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const { loading, error, user } = useSelector(state => state.userDetails)
    const { loading:loadingEdit, error:errorEdit, success: successEdit } = useSelector(state => state.userEdit)


    useEffect(() => {
        if(successEdit){
            dispatch({type: USER_EDIT_RESET })
            history.push("/admin/userlist")
        }else{
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [history, dispatch, userId, user, successEdit])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(editUser({_id: userId, name, email, isAdmin}))

    }

    return (
        <>
            <Link to="/admin/userList" className="btn btn-light my-3">Go Back</Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingEdit && <Loader />}
            {errorEdit && <Message variant="danger">{errorEdit}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (

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
                <Form.Group controlId="isAdmin" style={{marginTop: "15px"}}>
                    <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}>
                    </Form.Check>
                </Form.Group>

                <Button style={{marginTop: "15px"}} type="submit" variant="primary">Update</Button>
            </Form>

            )}
        </FormContainer>
        </>
    )
}

export default UserEditScreen
