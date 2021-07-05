import React, { useEffect, useState } from 'react'
import Chart from '../components/Chart'
import Input from '../components/Input'
import { shortenUrl } from '../actions/url.actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { isUrl } from '../helpers/validateUrl'

const Dashboard = () => {
    const [url, setUrl] = useState('')
    const [setCopy] = useState(false)
    const dispatch = useDispatch()
    const urlData = useSelector(state => state.url.urlData)
    const userId = useSelector(state => state.account.user.id)
    const shortUrl = urlData.shortUrl
    const totalClicks = urlData.clicks
    const uniqueClicks = urlData.uniqueClick


    useEffect(() => {
        dispatch(shortenUrl(url, userId))
    }, [totalClicks, uniqueClicks, userId, url, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!url && isUrl(url) === false) {
            return
        }
        dispatch(shortenUrl(url, userId))
    }

    function handleCopy() {
        setCopy(true)
    }

    function handleClick() {
        dispatch(shortenUrl(urlData.originUrl))
    }
    return (
        <div className="dashboard">
            <Chart />

            <form onSubmit={handleSubmit}>
                <Input type="text" onChange={(e) => setUrl(e.target.value)} placeholder="Enter url" className="form__input" />
                <button className="btn" type="submit">Shorten</button>
            </form>
            <div>
                {shortUrl ?
                    <div style={{ marginTop: '50px' }}>
                        <CopyToClipboard text={shortUrl}
                            onCopy={handleCopy}>
                            <button className="btn" style={{ marginRight: '30px' }}>Copy</button>
                        </CopyToClipboard>
                        < a style={{ color: '#fff', textDecoration: 'none' }} onClick={handleClick} target="_blank" rel="noreferrer" href={shortUrl}>{shortUrl}</a>
                    </div>

                    : null
                }
            </div>
        </div >
    )
}

export default Dashboard
