import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import { signup } from '../actions/user.actions'
import { useDispatch } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Message from '../components/Message'

const Signup = () => {
    const [account, setAccount] = useState({
        firstName: '', email: '', lastName: '', password: ''
    });
    const userAccount = useSelector(state => state.account)
    const message = userAccount.message
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAccount({ ...account, [name]: value });
    };
    let history = useHistory();

    useEffect(() => {
        if (userAccount.authenticate === true) {
            const timer = setTimeout(() => {
                history.push('/signin')
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [dispatch, history, userAccount.authenticate])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signup(account))
    }
    const token = localStorage.getItem('token')
    if (userAccount.authenticate === true && token) {
        return <Redirect to="/dashboard" />
    }
    return (
        <>
            <div className="">
                <div className="">
                    <Message variant="success">
                        {message}
                    </Message>
                </div>
                <form className="" onSubmit={handleSubmit}>
                    <Input label="FirstName"
                        labelClassName=""
                        className="" type='text'
                        name="firstName"
                        placeholder="firstName"
                        value={account.firstName}
                        onChange={handleChange}
                    />
                    <Input
                        label="Email Address"
                        labelClassName=""
                        className="" type='email'
                        name="email"
                        placeholder="email"
                        value={account.email}
                        onChange={handleChange}
                    />
                    <Input
                        label="Password"
                        labelClassName=""
                        className=""
                        type='password'
                        name="password"
                        placeholder="password"
                        value={account.password}
                        onChange={handleChange}
                    />
                    <Input
                        label="LastName"
                        labelClassName=""
                        className=""
                        type='text'
                        name="lastName"
                        placeholder="lastName"
                        value={account.lastName}
                        onChange={handleChange}
                    />
                    <button className="" type="submit"><span className="me-2">Register</span> 🌈</button>
                </form>
            </div>
        </>
    )
}

export default Signup
