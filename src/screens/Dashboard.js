import React, { useState } from 'react'
import Chart from '../components/Chart'
import Input from '../components/Input'
import { shortenUrl } from '../actions/url.actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Dashboard = () => {
    const [url, setUrl] = useState('')
    const [copy, setCopy] = useState(false)
    const dispatch = useDispatch()
    const urlData = useSelector(state => state.url.urlData)
    const shortUrl = urlData.shortUrl
    const handleSubmit = (e) => {
        e.preventDefault()
        //is valid url function
        if (!url) {
            return
        }
        dispatch(shortenUrl(url))
    }
    function handleCopy() {
        setCopy(true)
    }
    return (
        <div className="dashboard">
            <form onSubmit={handleSubmit}>
                <Input type="text" onChange={(e) => setUrl(e.target.value)} placeholder="Enter url" className="form__input" />
                <button className="btn" type="submit">Shorten</button>
                {/* <Chart /> */}
            </form>
            <div>
                {shortUrl ?
                    <div style={{ marginTop: '50px' }}>
                        <CopyToClipboard text={shortUrl}
                            onCopy={handleCopy}>
                            <button className="btn" style={{ marginRight: '30px' }}>Copy</button>
                        </CopyToClipboard>
                        {shortUrl}
                    </div>

                    : null
                    // < a target="_blank" rel="noreferrer" href={shortUrl}>{shortUrl}</a>
                }
            </div>
        </div >
    )
}

export default Dashboard
