import { useEffect, useState } from 'react'
import Input from '../components/Input'
import { useDispatch } from 'react-redux'
import { signin } from '../actions/user.actions'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { formValid } from '../helpers/formValid'


const Signin = () => {
    const [account, setAccount] = useState({
        email: '',
        password: ''
    })
    const [playing, setPlaying] = useState(false)
    const [isError, setIsError] = useState({
        email: '', password: ''
    })
    const [audio] = useState(new Audio('./234.mp3'));
    const [text, setText] = useState('Does size matter? Click')
    const dispatch = useDispatch()
    useEffect(() => {
        playing ? audio.play() : audio.pause()
    },
        [playing, audio]
    );
    const regExp = RegExp(
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    )
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case "email":
                isError.email = regExp.test(value)
                    ? ""
                    : "Email address is invalid";
                break;
            case "password":
                isError.password =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
                break;
            default:
                break
        }
        setIsError(isError)
        setAccount({ ...account, [name]: value });
    };
    function handleSignin(e) {
        e.preventDefault()
        if (formValid(isError)) {
            dispatch(signin(account))
        } else {
            console.log("form is invalid")
        }

    }

    const userAccount = useSelector(state => state.account)
    const token = userAccount.user.jwtToken
    localStorage.setItem('token', token);

    const getToken = localStorage.getItem('token')
    if (getToken && userAccount.authenticate === true) {
        return <Redirect to="/dashboard" />
    }
    const handleClick = () => {
        setPlaying(!playing)
        setText('Yes')
    }
    const stopMusic = () => {
        setPlaying(false)
    }
    return (
        <div className="signin">
            <div className="signin--border">
                <h1>Shortify</h1>
                {/* <img className="signin__img" onClick={toggle} src="/434.png" alt="" /> */}
                <h2 onClick={handleClick}>{text}</h2>
                <form className="form" onSubmit={handleSignin}>
                    <Input label="Email Address" labelClassName="form__label" className="form__input" type='email' name="email" placeholder="email" value={account.email} onChange={handleChange} />
                    {isError.email.length > 0 && (
                        <span className="invalid-feedback">{isError.email}</span>
                    )}
                    <Input label="Password" labelClassName="form__label" className="form__input" type='password' name="password" placeholder="password" value={account.password} onChange={handleChange} />
                    {isError.password.length > 0 && (
                        <span className="invalid-feedback">{isError.password}</span>
                    )}
                    <div className="signin__createAcc">
                        <p>Don't have account?</p>
                        <Link className="signin__link" to="/signup"> Sign up</Link>
                    </div>
                    <button onClick={stopMusic} className="liquidButton form__button">
                        <span style={{ fontSize: '15px', display: 'ruby' }}>Login 🐟</span>
                        <div className="liquid"></div>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signin
