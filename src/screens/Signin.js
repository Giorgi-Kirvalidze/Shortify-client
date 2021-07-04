import { useEffect, useState } from 'react'
import Input from '../components/Input'
import { useDispatch } from 'react-redux'
import { signin } from '../actions/user.actions'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import './signin.css'

const Signin = () => {
    const [account, setAccount] = useState({})
    const [playing, setPlaying] = useState(false)
    const [audio] = useState(new Audio('./2344.mp3'));
    const [text, setText] = useState('Does size matter? Click')
    const dispatch = useDispatch()
    useEffect(() => {
        playing ? audio.play() : audio.pause()
    },
        [playing, audio]
    );

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
    const handleClick = () => {
        setPlaying(!playing)
        setText('Yes')
    }
    const stopMusic = () => {
        setPlaying(false)
    }
    console.log(playing)
    return (
        <div className="signin">
            <div className="signin--border">
                <h1>Shortify</h1>
                {/* <img className="signin__img" onClick={toggle} src="/434.png" alt="" /> */}
                <h2 onClick={handleClick}>{text}</h2>
                <form className="form" onSubmit={handleSignin}>
                    <Input label="Email Address" labelClassName="form__label" className="form__input" type='email' name="email" placeholder="email" value={account.email} onChange={handleChange} />
                    <Input label="Password" labelClassName="form__label" className="form__input" type='password' name="password" placeholder="password" value={account.password} onChange={handleChange} />
                    <button onClick={stopMusic} className="liquidButton form__button">
                        <span style={{ fontSize: '15px', display: 'ruby' }}>Login 🐟</span>
                        <div class="liquid"></div>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signin
