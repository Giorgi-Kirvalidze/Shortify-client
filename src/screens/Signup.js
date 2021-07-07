import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import { signup } from '../actions/user.actions'
import { useDispatch } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formValid } from '../helpers/formValid'

const Signup = () => {
    const [account, setAccount] = useState({
        firstName: '', email: '', lastName: '', password: ''
    });
    const [isError, setIsError] = useState({
        firstName: '', email: '', lastName: '', password: ''
    })
    const userAccount = useSelector(state => state.account)
    const dispatch = useDispatch()

    let history = useHistory();

    useEffect(() => {
        if (userAccount.authenticate === true) {
            history.push('/signin')
        }
    }, [dispatch, history, userAccount.authenticate])


    const token = localStorage.getItem('token')
    if (userAccount.authenticate === true && token) {
        return <Redirect to="/dashboard" />
    }
    const regExp = RegExp(
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    )
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case "firstName":
                isError.firstName =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "email":
                isError.email = regExp.test(value)
                    ? ""
                    : "Email address is invalid";
                break;
            case "password":
                isError.password =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
                break;
            case "lastName":
                isError.lastName =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            default:
                break;
        }
        setIsError(isError)
        setAccount({ ...account, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValid(isError)) {
            dispatch(signup(account))
        } else {
            console.log("form is invalid")
        }
    }
    return (
        <>
            <div className="signup">
                <div className="signup--border">
                    <form className="form" onSubmit={handleSubmit}>
                        <Input label="FirstName"
                            labelClassName="form__label"
                            className="form__input"
                            type='text'
                            name="firstName"
                            placeholder="firstName"
                            value={account.firstName}
                            onChange={handleChange}
                        />
                        {isError.firstName.length > 0 && (
                            <span className="invalid-feedback">{isError.firstName}</span>
                        )}
                        <Input
                            label="LastName"
                            labelClassName="form__label"
                            className="form__input"
                            type='text'
                            name="lastName"
                            placeholder="lastName"
                            value={account.lastName}
                            onChange={handleChange}
                        />
                        {isError.lastName.length > 0 && (
                            <span className="invalid-feedback">{isError.lastName}</span>
                        )}
                        <Input
                            label="Email Address"
                            labelClassName="form__label"
                            className="form__input" type='email'
                            name="email"
                            placeholder="email"
                            value={account.email}
                            onChange={handleChange}
                        />
                        {isError.email.length > 0 && (
                            <span className="invalid-feedback">{isError.email}</span>
                        )}
                        <Input
                            label="Password"
                            labelClassName="form__label"
                            className="form__input"
                            type='password'
                            name="password"
                            placeholder="password"
                            value={account.password}
                            onChange={handleChange}
                        />
                        {isError.password.length > 0 && (
                            <span className="invalid-feedback">{isError.password}</span>
                        )}
                        <button className="btn signup__button" type="submit"><span className="me-2">Register</span> 🌈</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Signup




