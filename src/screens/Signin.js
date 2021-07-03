import { useState } from 'react'
import Input from '../components/Input'
import { useDispatch } from 'react-redux'
import { signin } from '../actions/user.actions'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import './signin.css'

const Signin = () => {
    const [account, setAccount] = useState({})
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAccount({ ...account, [name]: value });
    };

    function handleSignin(e) {
        e.preventDefault()
        dispatch(signin(account))
    }

    const userAccount = useSelector(state => state.account)
    const token = userAccount.user.jwtToken
    localStorage.setItem('token', token);

    const getToken = localStorage.getItem('token')
    if (getToken && userAccount.authenticate === true) {
        return <Redirect to="/dashboard" />
    }

    return (
        <form onSubmit={handleSignin}>
            <Input label="Email Address" labelClassName="" className="" type='email' name="email" placeholder="email" value={account.email} onChange={handleChange} />
            <Input label="Password" labelClassName="" className="" type='password' name="password" placeholder="password" value={account.password} onChange={handleChange} />
            <button style={{ border: 'none', marginTop: '62px' }} className="liquidButton">
                <span style={{ fontSize: '15px', display: 'ruby' }}>Login 🐟</span>
                <div class="liquid"></div>
            </button>
        </form>
    )
}

export default Signin
